import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Only create client if URL and key are provided (for client-side usage)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Server-side client with service role key
export function getSupabaseAdmin() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  if (!serviceRoleKey || !url) {
    // Return a mock client that will fail gracefully in mock mode
    if (process.env.MOCK_MODE === "true") {
      return null as any; // Type assertion to allow mock mode
    }
    throw new Error("Missing Supabase credentials");
  }
  
  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

