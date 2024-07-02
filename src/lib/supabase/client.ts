import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { env } from "@/env";
import { Database } from "./database.types";

export const createClient = () =>
  createClientComponentClient<Database>({
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  });

export const supabase = createClient();
