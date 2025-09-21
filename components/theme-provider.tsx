"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface ThemeContextType {
  darkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Check for saved theme preference or default to light mode
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

      if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        setDarkMode(true)
        document.documentElement.classList.add("dark")
      } else {
        setDarkMode(false)
        document.documentElement.classList.remove("dark")
      }
    }
  }, [])

  const toggleTheme = () => {
    if (typeof window === "undefined" || darkMode === undefined) return

    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const contextValue = {
    darkMode: darkMode ?? false,
    toggleTheme,
  }

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
