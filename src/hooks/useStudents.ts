"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

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

  const addStudent = async (s: Omit<Student, "id" | "joinedDate">) => {
    try {
      const { data, error } = await supabase.auth.signUp({
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

      if (error) {
        console.error("Error signing up student auth:", error.message || error);
        
        // Fallback: If auth signUp is rate limited or blocked, insert the profile record directly to make CRUD work instantly
        const tempId = typeof window !== "undefined" && window.crypto?.randomUUID 
          ? window.crypto.randomUUID() 
          : "student_" + Math.random().toString(36).substring(2, 9);
          
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: tempId,
            email: s.email,
            name: s.name,
            role: "student",
            track: s.track,
            progress: 0,
            password: s.password, // Added password here
            joined_date: new Date().toISOString().split('T')[0]
          });
          
        if (insertError) {
          console.error("Fallback profiles insert failed (likely due to auth foreign key):", insertError.message || insertError);
        } else {
          console.log("Successfully created student profile via fallback direct insert!");
        }
      } else {
        console.log("Successfully signed up student auth user!");
        if (data.user) {
          // Update the profile record with the plain text password for login fallback
          await supabase
            .from("profiles")
            .update({ password: s.password || "student123" })
            .eq("id", data.user.id);
        }
      }
      await fetchStudents();
    } catch (e) {
      console.error(e);
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
