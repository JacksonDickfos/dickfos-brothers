import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create client if URL and key are provided (for client-side usage)
// Use a dummy URL/key if not provided to prevent Supabase from throwing errors
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient("https://placeholder.supabase.co", "placeholder-key");

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

