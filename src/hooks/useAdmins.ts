"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

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
      const { data, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password || "admin123", // Default initial password
        options: {
          data: {
            name: data.name,
            role: "admin",
            track: "Global Command"
          }
        }
      });

      if (error) {
        console.error("Error creating admin auth:", error);
      } else {
        if (data?.user) {
          // Update profile record with password fallback
          await supabase
            .from("profiles")
            .update({ password: data.password || "admin123" })
            .eq("id", data.user.id);
        }
      }
      await fetchAdmins();
    } catch (e) {
      console.error(e);
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
