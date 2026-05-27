import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zalbmmlgsmtnvztvrckr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbGJtbWxnc210bnZ6dHZyY2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMTQxMjIsImV4cCI6MjA5NDU5MDEyMn0.YF4AHHe7ijJ5D1OuyDTQ3GCYr6O25yIK5uBtgTER9c8";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function forceReset() {
  const email = "deplotai@gmail.com";
  const newPassword = "admin123";
  
  // Update the profiles table
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ password: newPassword })
    .eq("email", email);

  if (profileError) {
    console.error("Failed to update profile:", profileError);
  } else {
    console.log(`Successfully reset password for ${email} to: ${newPassword} in profiles table`);
  }
}

forceReset();
