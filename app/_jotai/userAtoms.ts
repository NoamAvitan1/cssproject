import { Profile } from "@/types/Profile";
import { User } from "@supabase/supabase-js";
import { atom } from "jotai";

export const userAtom = atom<User | null>(null)
export const profileAtom = atom<Profile | null>(null)