"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase, supabaseUrl, supabaseAnonKey } from "@/utils/supabaseClient";

export interface Student {
  id: string;
  name: string;
  email: string;
  track?: string;
  progress: number;
  joinedDate: string;
  watchedVideos?: string[];
  status?: "Active" | "Inactive";
  password?: string;
  lastModule?: string;
}

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "student");

      if (error) {
        console.error("Error loading students:", error.message || error);
      } else {
        const mapped = (data || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          email: p.email,
          track: p.track,
          progress: p.progress,
          joinedDate: p.joined_date,
          watchedVideos: p.watched_videos || [],
          password: p.password,
          status: p.progress > 0 ? ("Active" as const) : ("Inactive" as const)
        }));
        setStudents(mapped);
      }
    } catch (e) {
      console.error("Failed to query students:", e);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (s: Omit<Student, "id" | "joinedDate">): Promise<{ success: boolean; error?: string }> => {
    try {
      const today = new Date().toISOString().split("T")[0];

      // 1. Check if the email already exists in profiles table
      const { data: existing, error: checkError } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", s.email)
        .maybeSingle();

      if (checkError) {
        console.error("Error checking existing profile:", checkError);
      }

      if (existing) {
        console.log("Email already exists in profiles. Enrolling directly...");
        // Update their role and password directly
        const { error: promoteError } = await supabase
          .from("profiles")
          .update({
            role: "student",
            name: s.name,
            track: s.track,
            progress: s.progress || 0,
            password: s.password || "student123"
          })
          .eq("id", existing.id);

        if (promoteError) {
          console.error("Error promoting user to student:", promoteError);
          return { success: false, error: promoteError.message || "Failed to enroll existing profile." };
        }
        await fetchStudents();
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

      const { data: signUpData, error: signUpError } = await tempClient.auth.signUp({
        email: s.email,
        password: s.password || "student123", // Use custom form password or fallback
        options: {
          data: {
            name: s.name,
            role: "student",
            track: s.track
          }
        }
      });

      if (signUpError) {
        console.warn("Notice signing up student auth:", signUpError.message || signUpError);
        return { success: false, error: signUpError.message };
      }
      
      if (signUpData.user) {
        console.log("Successfully signed up student auth user!");
        
        // Wait 300ms to ensure the trigger has created the profile row
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        // UPSERT the profile record to ensure it exists and has the correct data, fixing orphaned auth users
        const { error: upsertError } = await supabase
          .from("profiles")
          .upsert({ 
            id: signUpData.user.id,
            email: s.email,
            name: s.name,
            password: s.password || "student123",
            role: "student",
            track: s.track,
            progress: 0,
            joined_date: today
          });
          
        if (upsertError) {
          console.error("Error upserting student details in profiles:", upsertError.message || upsertError);
        }
      }
      await fetchStudents();
      return { success: true };
    } catch (e: any) {
      console.error("Failed to enroll student:", e);
      return { success: false, error: e.message || "Failed to enroll scholar." };
    }
  };

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    try {
      const dbUpdates: any = {};
      if (updates.name) dbUpdates.name = updates.name;
      if (updates.track) dbUpdates.track = updates.track;
      if (updates.progress !== undefined) dbUpdates.progress = updates.progress;
      if (updates.watchedVideos) dbUpdates.watched_videos = updates.watchedVideos;

      const { error } = await supabase
        .from("profiles")
        .update(dbUpdates)
        .eq("id", id);

      if (error) console.error("Error updating profile:", error);
      await fetchStudents();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", id);

      if (error) console.error("Error deleting student profile:", error);
      await fetchStudents();
    } catch (e) {
      console.error(e);
    }
  };

  const markVideoWatched = async (studentId: string, videoUrl: string) => {
    try {
      const student = students.find(s => s.id === studentId);
      if (!student) return;
      const watched = student.watchedVideos || [];
      if (!watched.includes(videoUrl)) {
        const updatedList = [...watched, videoUrl];
        const { error } = await supabase
          .from("profiles")
          .update({ watched_videos: updatedList })
          .eq("id", studentId);

        if (error) {
          console.error("Error saving watched videos:", error);
        }
        await fetchStudents();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    students,
    isLoaded,
    addStudent,
    updateStudent,
    deleteStudent,
    markVideoWatched
  };
}
