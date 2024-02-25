import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState"

const DarkModeContxt = createContext()


const DarkModeProvide = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode")

    const toggleDarkMode = () => {
        setIsDarkMode(cv => !cv)
    }

    useEffect(() => {
        if (isDarkMode){
          document.documentElement.classList.add("dark-mode")
          document.documentElement.classList.remove("light-mode")
        }
        else {
          document.documentElement.classList.add("light-mode")
          document.documentElement.classList.remove("dark-mode")
        }
      }, [isDarkMode])

    return (
        <DarkModeContxt.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContxt.Provider>
    )

}

const useDarkMode = () => {
    const context = useContext(DarkModeContxt)
    if (context === undefined)
        throw new Error("DarkModeContext wae used outside DarkModeContext Provider!")
    return context
}

export {useDarkMode , DarkModeProvide}