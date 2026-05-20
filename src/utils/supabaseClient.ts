import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zalbmmlgsmtnvztvrckr.supabase.co";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbGJtbWxnc210bnZ6dHZyY2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMTQxMjIsImV4cCI6MjA5NDU5MDEyMn0.YF4AHHe7ijJ5D1OuyDTQ3GCYr6O25yIK5uBtgTER9c8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
