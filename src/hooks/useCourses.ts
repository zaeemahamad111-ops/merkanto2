"use client";

import { useState, useEffect } from "react";

export interface Session {
  id: string;
  title: string;
  youtubeUrl: string;
  description?: string;
  img?: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  status?: "Draft" | "Live";
  img?: string;
  sessions: Session[];
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from local storage
  useEffect(() => {
    const saved = localStorage.getItem("merkanto_courses");
    if (saved) {
      try {
        setCourses(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse courses from local storage", e);
      }
    } else {
      // Default dummy course if nothing exists
      const defaultCourse: Course = {
        id: "default-1",
        title: "Import-Export Fundamentals",
        description: "Learn the basics of global trade.",
        status: "Live",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIS_XXZEdyc4X_TjQ0j2jFwwhbN2IBRWXTed_znHlmdrsvzjIiyretvhJ1qlntdwbjH_fAsMW-Kex6I3_wXNqxLetnBrptc7iyo5xHN10JGNpZ1PqS_M0LOHlUD4ov2ny-u_h8B8cz1Cg1ozlHBJ3l8k7TSKDzKt7aJS3milJqhUDgHrQ9R0pGQqfOTSZABWDOXdEeufsC1plzMGddT1BLrJPND-T1jIV05TKegE2yM6rrbb0lhPmk8AbxOCkUgpYJ01abfCOO-mk",
        sessions: [
          {
            id: "session-1",
            title: "Lesson 1: Introduction to Global Logistics",
            youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            description: "An overview of international trade routes and supply chain design.",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCklkeF4ZuMkBb75fsxKi5nNkwJbIhrHIfNrxc6miByGr7FpA4eCJjXy8z_KyvgKdU9Vgsg0I_REtweRpXHgVzsxFBhAluhenfRbhDS8tYaTVc4Mfx9PLYrGgntSE0cWyF2fbIryXFXGkShzU8jQptEPPYrx35C-BpX1nM2yFBdqXP1yHMZ2Bibq3eTXcynJBrjvUcLi7qFDaOX0BEa-EaMaR9vDB1idAOkW_dvivnre8ApnLwmHG4xZrWHFH9JZ2Vsbe7p-KHwJw",
          }
        ]
      };
      setCourses([defaultCourse]);
      localStorage.setItem("merkanto_courses", JSON.stringify([defaultCourse]));
    }
    setIsLoaded(true);
  }, []);

  const saveToStorage = (newCourses: Course[]) => {
    setCourses(newCourses);
    localStorage.setItem("merkanto_courses", JSON.stringify(newCourses));
  };

  const addCourse = (courseData: Omit<Course, "id">) => {
    const newCourse = {
      ...courseData,
      id: Math.random().toString(36).substring(2, 9),
      status: "Live" as const,
      img: courseData.img || "https://lh3.googleusercontent.com/aida-public/AB6AXuCklkeF4ZuMkBb75fsxKi5nNkwJbIhrHIfNrxc6miByGr7FpA4eCJjXy8z_KyvgKdU9Vgsg0I_REtweRpXHgVzsxFBhAluhenfRbhDS8tYaTVc4Mfx9PLYrGgntSE0cWyF2fbIryXFXGkShzU8jQptEPPYrx35C-BpX1nM2yFBdqXP1yHMZ2Bibq3eTXcynJBrjvUcLi7qFDaOX0BEa-EaMaR9vDB1idAOkW_dvivnre8ApnLwmHG4xZrWHFH9JZ2Vsbe7p-KHwJw", // default image
      sessions: courseData.sessions || [],
    };
    saveToStorage([...courses, newCourse]);
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    const newCourses = courses.map((c) => (c.id === id ? { ...c, ...updates } : c));
    saveToStorage(newCourses);
  };

  const deleteCourse = (id: string) => {
    const newCourses = courses.filter((c) => c.id !== id);
    saveToStorage(newCourses);
  };

  return {
    courses,
    isLoaded,
    addCourse,
    updateCourse,
    deleteCourse,
  };
}
