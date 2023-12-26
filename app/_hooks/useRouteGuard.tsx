import { useAtom } from "jotai";
import { userAtom } from "../_jotai/userAtoms";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  checkAuth: boolean;
  fallbackRoute: string;
  guards?: Array<() => boolean>;
};

export const useRouteGuard = ({
  checkAuth = true,
  fallbackRoute = "/",
  guards,
}: Props) => {
  const [user] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    if (!user?.id) router.push(fallbackRoute);

    if (guards) {
      for (const guard of guards) {
        if (!guard) router.push(fallbackRoute);
      }
    }
  }, []);
};
