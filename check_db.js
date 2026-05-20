import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zalbmmlgsmtnvztvrckr.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbGJtbWxnc210bnZ6dHZyY2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMTQxMjIsImV4cCI6MjA5NDU5MDEyMn0.YF4AHHe7ijJ5D1OuyDTQ3GCYr6O25yIK5uBtgTER9c8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDatabase() {
  console.log("Checking profiles table...");
  const { data: profiles, error } = await supabase.from("profiles").select("*");
  if (error) {
    console.error("Error fetching profiles:", error);
  } else {
    console.log("Profiles in DB:", profiles);
  }
}

checkDatabase();
