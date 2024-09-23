import React, { createContext, useState, useEffect, useMemo } from 'react'
import { themeData } from '../data/themeData'
import { blueThemeLight, blueThemeDark } from '../theme/theme'

export const ThemeContext = createContext()

function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('isDarkMode')
        // Si aucun mode n'est sauvegardé, on retourne true pour le mode sombre par défaut
        return savedMode !== null ? JSON.parse(savedMode) : true
    })

    const theme = useMemo(() => isDarkMode ? blueThemeDark : blueThemeLight, [isDarkMode])

    useEffect(() => {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
    }, [isDarkMode])

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode)
    }

    const value = useMemo(() => ({ theme, isDarkMode, toggleTheme }), [theme, isDarkMode])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider }