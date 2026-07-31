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

  const fetchDemoVideos = async () => {
    try {
      const { data } = await supabase
        .from("merkanto_content")
        .select("key, value")
        .in("key", ["demo.v1.title", "demo.v1.url", "demo.v2.title", "demo.v2.url"]);

      if (data) {
        const getVal = (k: string, fb: string) => data.find(d => d.key === k)?.value || fb;
        return {
          v1: {
            title: getVal("demo.v1.title", "Demo Video 1: Masterclass Overview"),
            url: getVal("demo.v1.url", "https://player.vimeo.com/video/1197817919?h=31d77d474c")
          },
          v2: {
            title: getVal("demo.v2.title", "Demo Video 2: Operational Systems Preview"),
            url: getVal("demo.v2.url", "https://player.vimeo.com/video/1197817919?h=31d77d474c")
          }
        };
      }
    } catch (e) {
      console.error("Failed to load demo videos:", e);
    }
    return {
      v1: { title: "Demo Video 1: Masterclass Overview", url: "https://player.vimeo.com/video/1197817919?h=31d77d474c" },
      v2: { title: "Demo Video 2: Operational Systems Preview", url: "https://player.vimeo.com/video/1197817919?h=31d77d474c" }
    };
  };

  const saveDemoVideos = async (v1: { title: string; url: string }, v2: { title: string; url: string }) => {
    try {
      const payload = [
        { key: "demo.v1.title", value: v1.title, category: "Demo", label: "Demo Video 1 Title", type: "text" },
        { key: "demo.v1.url", value: v1.url, category: "Demo", label: "Demo Video 1 URL", type: "video" },
        { key: "demo.v2.title", value: v2.title, category: "Demo", label: "Demo Video 2 Title", type: "text" },
        { key: "demo.v2.url", value: v2.url, category: "Demo", label: "Demo Video 2 URL", type: "video" },
      ];
      await supabase.from("merkanto_content").upsert(payload, { onConflict: "key" });
      return true;
    } catch (e) {
      console.error("Error saving demo videos:", e);
      return false;
    }
  };

  return { demoRequests, isLoaded, updateDemoStatus, deleteDemoRequest, clearAllDemoRequests, fetchDemoRequests, fetchDemoVideos, saveDemoVideos };
}
