import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create client if URL and key are provided (for client-side usage)
// Return a mock client that won't be used if credentials are missing
let supabaseClient: SupabaseClient | null = null;

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (error) {
  console.warn("Failed to initialize Supabase client:", error);
  supabaseClient = null;
}

export const supabase = supabaseClient;

// Server-side client with service role key
export function getSupabaseAdmin() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  // Always allow mock mode - don't throw errors
  if (!serviceRoleKey || !url) {
    // Return null to indicate mock mode - API routes will handle this
    return null as any;
  }
  
  try {
    return createClient(url, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  } catch (error) {
    // If client creation fails, return null for mock mode
    console.error("Failed to create Supabase admin client:", error);
    return null as any;
  }
}

