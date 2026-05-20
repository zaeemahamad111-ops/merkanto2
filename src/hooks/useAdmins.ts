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

  const addAdmin = async (data: Omit<Admin, "id" | "joinedDate" | "role"> & { password?: string }) => {
    try {
      const today = new Date().toISOString().split("T")[0];

      // Create a temporary client with persistSession: false to avoid overwriting current session
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
        console.error("Error signing up admin auth:", signUpError.message || signUpError);
        
        // Fallback: If auth signUp is blocked, try to insert profile directly (matches original attempt)
        const tempId = crypto.randomUUID();
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: tempId,
            name: data.name,
            email: data.email,
            password: data.password || "admin123",
            role: "admin",
            track: "Global Command",
            joined_date: today
          });

        if (insertError) {
          console.error("Fallback profiles insert failed:", insertError.message || insertError);
          return false;
        }
        console.log("Successfully created admin profile via fallback direct insert!");
      } else if (signUpData.user) {
        console.log("Successfully signed up admin auth user!");
        
        // Use tempClient (authenticated as new user) to update their password in profiles table
        const { error: updateError } = await tempClient
          .from("profiles")
          .update({ password: data.password || "admin123" })
          .eq("id", signUpData.user.id);

        if (updateError) {
          console.error("Error saving admin plaintext password:", updateError.message || updateError);
        }
      }

      await fetchAdmins();
      return true;
    } catch (e) {
      console.error("Failed to create admin:", e);
      return false;
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
