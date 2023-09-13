'use client'

import { useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

type Props = {
  
};

export const ThemeChangeButton: React.FC<Props> = (props) => {

  const [theme, setTheme] = useState<string>('light')

  return (
    <button onClick={() => setTheme(prev => prev == 'light' ? 'dark' : 'light')} className="fixed top-8 right-8 text-text">
      {theme == 'light' ? <BsSun /> : <BsMoon />}
    </button>
  );
};
