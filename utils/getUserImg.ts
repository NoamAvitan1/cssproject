import { User } from "@supabase/supabase-js";

export const getUserImg = (user: User) => {
    if (!user.identities) return null
    for (const identity of user.identities) {
        if (identity?.identity_data?.avatar_url)
        return identity.identity_data.avatar_url
    } 
    return null
}