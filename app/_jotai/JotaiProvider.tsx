'use client'

import { Provider } from "jotai";

type Props = {

};

export const JotaiProvider = ({ children }: { children: React.ReactNode }) => {

  return (
    <Provider>
        {children}
    </Provider>
  );
};
