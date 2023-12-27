import { useRouter, useSearchParams } from "next/navigation";


export const useQueryParam = (key: string, value: string) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set(key, value);
      router.pus(`?${currentParams.toString()}`);

}