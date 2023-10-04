'use client'
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { themeAtom } from '../../_jotai/themeAtoms'

type Props = {
  
};

export const ThemeChangeButton: React.FC<Props> = (props) => {
  const [theme, setTheme] = useAtom(themeAtom)
  
  const defineGlobalTheme = () => {
    let globalTheme="light"

    if(localStorage.getItem("globalTheme")){
        if(localStorage.getItem("globalTheme") == "dark"){
            globalTheme = "dark"
        }
    } 
    else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
        globalTheme = "dark"
    }
    
    localStorage.setItem("globalTheme", globalTheme)
    document.documentElement.setAttribute("globalTheme", globalTheme)
    setTheme(document.documentElement.getAttribute('globalTheme') ?? 'light')
  }

  const changeGlobalTheme = () => {
    const newTheme = theme == 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem("globalTheme", newTheme)
    document.documentElement.setAttribute("globalTheme", newTheme)
  }

  useEffect(() => {
    defineGlobalTheme()
  }, [])

  return (
    <button onClick={changeGlobalTheme} className="text-text">
      {theme == 'light' ? <BsSun /> : <BsMoon />}
    </button>
  );
};
