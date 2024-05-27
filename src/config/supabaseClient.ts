import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey: string = import.meta.env
  .VITE_SUPABASE_ANON_KEY as string;

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default supabaseClient;
