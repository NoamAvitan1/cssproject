import { Database } from "./supabase";

export type Profile = Database["public"]["Tables"]["profile"]["Row"];