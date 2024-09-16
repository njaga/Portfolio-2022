import React, { createContext, useState, useEffect } from 'react'
import { themeData } from '../data/themeData'
import { blueThemeLight, blueThemeDark } from '../theme/theme'

export const ThemeContext = createContext()

function ThemeContextProvider(props) {
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            return JSON.parse(savedTheme)
        }
        return themeData.theme
    }

    const getInitialIsDarkMode = () => {
        const savedIsDarkMode = localStorage.getItem('isDarkMode')
        if (savedIsDarkMode !== null) {
            return JSON.parse(savedIsDarkMode)
        }
        return themeData.theme === blueThemeDark
    }

    const [theme, setTheme] = useState(getInitialTheme)
    const [isDarkMode, setIsDarkMode] = useState(getInitialIsDarkMode)
    const [drawerOpen, setDrawerOpen] = useState(false)

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme))
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
    }, [theme, isDarkMode])

    const setHandleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
        setTheme(currentTheme => 
            currentTheme === blueThemeLight ? blueThemeDark : blueThemeLight
        )
    }

    const value = { theme, drawerOpen, setHandleDrawer, toggleTheme, isDarkMode }
    return (
        <ThemeContext.Provider value={value}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider