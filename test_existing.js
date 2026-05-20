import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zalbmmlgsmtnvztvrckr.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbGJtbWxnc210bnZ6dHZyY2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMTQxMjIsImV4cCI6MjA5NDU5MDEyMn0.YF4AHHe7ijJ5D1OuyDTQ3GCYr6O25yIK5uBtgTER9c8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testExistingSignup() {
  console.log("Signing up an already existing auth user (e.g. one who failed profile creation)...");
  
  // We use an email we know is in Auth (the one we just created)
  const tempEmail = "test1779297331539@merkanto.com";
  
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: tempEmail,
    password: "testpassword123",
  });
  
  console.log("signUpError:", signUpError);
  console.log("signUpData.user:", signUpData.user);
}

testExistingSignup();
