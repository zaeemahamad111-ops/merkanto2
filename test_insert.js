import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zalbmmlgsmtnvztvrckr.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbGJtbWxnc210bnZ6dHZyY2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMTQxMjIsImV4cCI6MjA5NDU5MDEyMn0.YF4AHHe7ijJ5D1OuyDTQ3GCYr6O25yIK5uBtgTER9c8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSignupAndInsert() {
  console.log("Creating test user in auth...");
  const tempEmail = "test" + Date.now() + "@merkanto.com";
  
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: tempEmail,
    password: "testpassword123",
  });
  
  if (signUpError) {
    console.error("Auth Error:", signUpError);
  } else {
    console.log("Auth Success ID:", signUpData.user?.id);
    
    // Check if profile was auto-created
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", signUpData.user?.id).maybeSingle();
    console.log("Auto-created profile:", profile);
    
    if (!profile) {
      console.log("Trying manual insert...");
      const { error: insertError } = await supabase.from("profiles").insert({
        id: signUpData.user?.id,
        email: tempEmail,
        name: "Test User",
        role: "student",
        joined_date: new Date().toISOString().split("T")[0]
      });
      console.log("Manual insert error:", insertError || "Success!");
    }
  }
}

testSignupAndInsert();
