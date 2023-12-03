// 'use client'
// import { useEffect } from "react"

// const defineGlobalTheme = () => {
//     let globalTheme="light"

//     if(localStorage.getItem("globalTheme")){
//         if(localStorage.getItem("globalTheme") == "dark"){
//             globalTheme = "dark"
//         }
//     } else if(!window.matchMedia) {
//         return false
//     } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
//         globalTheme = "dark"
//     }

//     if (globalTheme=="dark") {
//          document.documentElement.setAttribute("data-globalTheme", "dark")
//     }
// }

// export const AppStarter = () => {
    

// //   useEffect(() => {
// //     defineGlobalTheme()
// //   }, [])
    
//   return (
//       <></>
//   )
// }