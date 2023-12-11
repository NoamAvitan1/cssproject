import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { tell } from "../_components/teller/Tale";

export const useSignOut = async (cb?: Function) => {
  const supabase = createClientComponentClient();

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      tell("Signed out successfully", "success");
      if (cb) cb()
    } catch (error: any) {
      tell(error.message, "error");
    }
  };
};
