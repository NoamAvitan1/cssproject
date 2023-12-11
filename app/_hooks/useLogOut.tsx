import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { tell } from "../_components/teller/Tale";
import Api from "@/utils/axios";

export const useSignOut = async (cb?: Function) => {
  const supabase = createClientComponentClient();

  const signOut = async () => {
    try {
      await Api.post('auth/sign-out/');
      tell("Signed out successfully", "success");
      if (cb) cb()
    } catch (error: any) {
      tell(error.message, "error");
    }
  };
  signOut();
};
