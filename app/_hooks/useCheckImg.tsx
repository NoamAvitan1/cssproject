import { User } from "@supabase/supabase-js";
import axios from "axios";

export const useCheckImg = async (url: string): Promise<boolean> => {
  let bool: boolean = false;
  axios
    .get(url)
    .then(() => (bool = true))
    .catch(() => (bool = false));
  return bool;
};
