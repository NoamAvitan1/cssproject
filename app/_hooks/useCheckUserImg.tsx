import { User } from "@supabase/supabase-js";
import { useCheckImg } from "./useCheckImg";

export const useCheckUserImg = (user: User): string | null => {
    let url: string | null = `https://ielhefdzhfesqnlbxztn.supabase.co/storage/v1/object/public/profile%20pic/${user?.id}/${user?.id}`;
    const bool = useCheckImg(url).then((bool) => {
      if (bool) return url;
      else if (user?.user_metadata?.picture) url = user.user_metadata.picture;
      else if (user?.user_metadata?.avatar_url) url = user.user_metadata.avatar_url;
      else url = null;
    })
    .catch(() => url = null)
    return url;
  };