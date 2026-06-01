import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('waas-theme')
    if (saved === 'light' || saved === 'dark') return saved
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return systemPrefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('waas-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none"
      aria-label="Alternar tema"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Sun className="w-5 h-5 transition-transform duration-300 hover:rotate-45" />
      )}
    </button>
  )
}
