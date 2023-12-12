import { useState } from "react";

export const useSetQuery = (param: string, value: string) => {
  const [stateParam,setStateParam] = useState<any>({
    key:param,
    value:value,
  }) 
  const url = new URL(window.location.href);
  url.searchParams.set(param, value);
  window.history.replaceState({}, "", url);
  setStateParam({key:param, value:value})
};
