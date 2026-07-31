"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

export interface DemoProfile {
  id: string;
  name: string;
  email: string;
  demo_status: "pending" | "approved" | "paused" | "rejected";
  role: string;
}

export function useDemo() {
  const [demoRequests, setDemoRequests] = useState<DemoProfile[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchDemoRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, email, demo_status, role")
        .not("demo_status", "is", null);

      if (error) {
        console.error("Error loading demo requests:", error.message || error);
      } else {
        setDemoRequests(data as DemoProfile[]);
      }
    } catch (e) {
      console.error("Failed to query demo requests:", e);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchDemoRequests();
  }, []);

  const updateDemoStatus = async (id: string, status: DemoProfile["demo_status"]) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ demo_status: status })
        .eq("id", id);
        
      if (error) throw error;
      await fetchDemoRequests();
      return true;
    } catch (e) {
      console.error("Failed to update status:", e);
      return false;
    }
  };

  const deleteDemoRequest = async (id: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ demo_status: null })
        .eq("id", id);
        
      if (error) throw error;
      await fetchDemoRequests();
      return true;
    } catch (e) {
      console.error("Failed to clear demo request:", e);
      return false;
    }
  };

  const clearAllDemoRequests = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ demo_status: null })
        .not("demo_status", "is", null);
        
      if (error) throw error;
      await fetchDemoRequests();
      return true;
    } catch (e) {
      console.error("Failed to clear demo requests:", e);
      return false;
    }
  };

  return { demoRequests, isLoaded, updateDemoStatus, deleteDemoRequest, clearAllDemoRequests, fetchDemoRequests };
}
