import { User } from "@supabase/supabase-js";
import { useCheckImg } from "./useCheckImg";

export const useCheckUserImg = async (user: User): Promise<string | null> => {
  console.log(user);
  let url:
    | string
    | null = `https://ielhefdzhfesqnlbxztn.supabase.co/storage/v1/object/public/profile%20pic/${user?.id}/${user?.id}`;
  let bool: boolean = false;
  bool = await useCheckImg(url);
  if (bool) return url;
  if (user?.user_metadata?.picture)
    bool = await useCheckImg((url = user.user_metadata.picture));
  if (bool) return user.user_metadata.picture;
  if (user?.user_metadata?.avatar_url)
    bool = await useCheckImg(user.user_metadata.avatar_url);
  if (bool) return user.user_metadata.avatar_url;
  return null;
};
