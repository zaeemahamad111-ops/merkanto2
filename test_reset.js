import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zalbmmlgsmtnvztvrckr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbGJtbWxnc210bnZ6dHZyY2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMTQxMjIsImV4cCI6MjA5NDU5MDEyMn0.YF4AHHe7ijJ5D1OuyDTQ3GCYr6O25yIK5uBtgTER9c8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testReset() {
  console.log("Testing reset password for fake email...");
  const { error } = await supabase.auth.resetPasswordForEmail("doesnotexist@merkanto.com", {
    redirectTo: "http://localhost:3000/reset-password",
  });
  if (error) {
    console.error("Supabase Auth Error:", error.message, error.status);
  } else {
    console.log("Reset email sent successfully.");
  }
}

testReset();
