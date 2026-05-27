import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zalbmmlgsmtnvztvrckr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbGJtbWxnc210bnZ6dHZyY2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMTQxMjIsImV4cCI6MjA5NDU5MDEyMn0.YF4AHHe7ijJ5D1OuyDTQ3GCYr6O25yIK5uBtgTER9c8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testCreate() {
  const email = "teststudent_" + Date.now() + "@test.com";
  console.log("Signing up:", email);
  
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: email,
    password: "student123",
    options: {
      data: {
        name: "Test Student",
        role: "student",
        track: "Trade Logistics"
      }
    }
  });

  if (signUpError) {
    console.error("SignUp Error:", signUpError);
    return;
  }

  console.log("SignUp Success. User ID:", signUpData.user.id);
  
  const { error: upsertError } = await supabase
    .from("profiles")
    .upsert({ 
      id: signUpData.user.id,
      email: email,
      name: "Test Student",
      password: "student123",
      role: "student",
      track: "Trade Logistics",
      progress: 0,
      joined_date: new Date().toISOString().split("T")[0]
    });
    
  if (upsertError) {
    console.error("Upsert Error:", upsertError);
  } else {
    console.log("Upsert Success!");
  }
}

testCreate();
