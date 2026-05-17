"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

export interface Student {
  id: string;
  name: string;
  email: string;
  track: string;
  progress: number;
  joinedDate: string;
  watchedVideos?: string[];
  status: "Active" | "Inactive";
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
      // Create user auth in Supabase (triggers profile handle_new_user automatically!)
      const { error } = await supabase.auth.signUp({
        email: s.email,
        password: "student123", // initial temporary password
        options: {
          data: {
            name: s.name,
            role: "student",
            track: s.track
          }
        }
      });

      if (error) {
        console.error("Error signing up student auth:", error);
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
