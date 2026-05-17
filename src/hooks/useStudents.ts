"use client";

import { useState, useEffect } from "react";

export interface Student {
  id: string;
  name: string;
  email: string;
  password?: string;
  track: string;
  progress: number;
  lastModule: string;
  status: "Active" | "Inactive";
  joinedDate: string;
  watchedVideos?: string[];
}

const DEFAULT_STUDENTS: Student[] = [
  { id: "s1", name: "Aisha Nair", email: "aisha@university.edu", password: "password123", track: "Executive Track", progress: 88, lastModule: "Module 07", status: "Active", joinedDate: "2024-01-15", watchedVideos: [] },
  { id: "s5", name: "James Sterling", email: "student@merkanto.com", password: "student123", track: "Executive Track", progress: 57, lastModule: "Module 06", status: "Active", joinedDate: "2024-01-10", watchedVideos: [] },
];

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("merkanto_students");
    if (saved) {
      try { setStudents(JSON.parse(saved)); } catch { setStudents(DEFAULT_STUDENTS); }
    } else {
      setStudents(DEFAULT_STUDENTS);
      localStorage.setItem("merkanto_students", JSON.stringify(DEFAULT_STUDENTS));
    }
    setIsLoaded(true);
  }, []);

  const save = (data: Student[]) => {
    setStudents(data);
    localStorage.setItem("merkanto_students", JSON.stringify(data));
  };

  const addStudent = (s: Omit<Student, "id" | "joinedDate">) => {
    const newStudent = { ...s, id: Math.random().toString(36).slice(2, 9), joinedDate: new Date().toISOString().split("T")[0] };
    save([...students, newStudent]);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    save(students.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteStudent = (id: string) => {
    save(students.filter(s => s.id !== id));
  };

  const markVideoWatched = (studentId: string, videoUrl: string) => {
    save(students.map(s => {
      if (s.id === studentId) {
        const watched = s.watchedVideos || [];
        if (!watched.includes(videoUrl)) {
          return { ...s, watchedVideos: [...watched, videoUrl] };
        }
      }
      return s;
    }));
  };

  return { students, isLoaded, addStudent, updateStudent, deleteStudent, markVideoWatched };
}
