'use client'
import { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

type Props = {
  
};

export const ThemeChangeButton: React.FC<Props> = (props) => {

  const [theme, setTheme] = useState<string>(document.documentElement.getAttribute('globalTheme') ?? 'light')

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
    console.log(document.documentElement.getAttribute('globalTheme'));
  }

  useEffect(() => {
    defineGlobalTheme()
  }, [])

  return (
    <button onClick={changeGlobalTheme} className="fixed top-8 right-8 text-text">
      {theme == 'light' ? <BsSun /> : <BsMoon />}
    </button>
  );
};
