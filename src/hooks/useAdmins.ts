"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase, supabaseUrl, supabaseAnonKey } from "@/utils/supabaseClient";

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: "admin";
  joinedDate: string;
  password?: string;
}

export function useAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "admin");

      if (error) {
        console.error("Error loading admins:", error);
      } else {
        const mapped = (data || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          email: p.email,
          role: "admin" as const,
          joinedDate: p.joined_date,
          password: p.password
        }));
        setAdmins(mapped);
      }
    } catch (e) {
      console.error("Failed to query admins:", e);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const addAdmin = async (data: Omit<Admin, "id" | "joinedDate" | "role"> & { password?: string }): Promise<{ success: boolean; error?: string }> => {
    try {
      const today = new Date().toISOString().split("T")[0];

      // 1. Check if the email already exists in profiles table
      const { data: existing, error: checkError } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", data.email)
        .maybeSingle();

      if (checkError) {
        console.error("Error checking existing profile:", checkError);
      }

      if (existing) {
        console.log("Email already exists in profiles. Promoting to admin directly...");
        // Directly update their role to admin and set their name/password
        const { error: promoteError } = await supabase
          .from("profiles")
          .update({
            role: "admin",
            name: data.name,
            password: data.password || "admin123"
          })
          .eq("id", existing.id);

        if (promoteError) {
          console.error("Error promoting user to admin:", promoteError);
          return { success: false, error: promoteError.message || "Failed to promote existing profile." };
        }
        await fetchAdmins();
        return { success: true };
      }

      // 2. Create a temporary client with persistSession: false to avoid overwriting current session
      const tempClient = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      });

      // Sign up the new user in Supabase auth
      const { data: signUpData, error: signUpError } = await tempClient.auth.signUp({
        email: data.email,
        password: data.password || "admin123",
        options: {
          data: {
            name: data.name,
            role: "admin",
            track: "Global Command"
          }
        }
      });

      if (signUpError) {
        console.warn("Notice signing up admin auth:", signUpError.message || signUpError);
        return { success: false, error: signUpError.message };
      }

      if (signUpData.user) {
        console.log("Successfully signed up admin auth user!");
        
        // Wait 300ms to ensure the trigger has created the profile row
        await new Promise((resolve) => setTimeout(resolve, 300));

        // UPSERT the profile record to ensure it exists and has the correct data, fixing orphaned auth users
        const { error: upsertError } = await supabase
          .from("profiles")
          .upsert({ 
            id: signUpData.user.id,
            email: data.email,
            name: data.name,
            password: data.password || "admin123",
            role: "admin",
            joined_date: today
          });

        if (upsertError) {
          console.error("Error upserting admin details in profiles:", upsertError.message || upsertError);
        }
      }

      await fetchAdmins();
      return { success: true };
    } catch (e: any) {
      console.error("Failed to create admin:", e);
      return { success: false, error: e.message || "Failed to create administrator." };
    }
  };

  const deleteAdmin = async (id: string) => {
    // Prevent deleting the primary seed admin
    if (id === "a1") return;
    try {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", id);

      if (error) console.error("Error deleting admin profile:", error);
      await fetchAdmins();
    } catch (e) {
      console.error(e);
    }
  };

  const updateAdmin = async (id: string, updates: Partial<Admin>) => {
    try {
      const dbUpdates: any = {};
      if (updates.name) dbUpdates.name = updates.name;

      const { error } = await supabase
        .from("profiles")
        .update(dbUpdates)
        .eq("id", id);

      if (error) console.error("Error updating admin profile:", error);
      await fetchAdmins();
    } catch (e) {
      console.error(e);
    }
  };

  return {
    admins,
    isLoaded,
    addAdmin,
    deleteAdmin,
    updateAdmin
  };
}
