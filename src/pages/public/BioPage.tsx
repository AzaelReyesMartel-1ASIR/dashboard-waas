import { useEffect, useState } from 'react'
import { getPublicLinks } from '../../core/services/openbio.service'
import type { Link } from '../../core/services/openbio.service'
import DynamicIcon from '../../components/ui/DynamicIcon'
import ThemeSwitcher from '../../components/common/ThemeSwitcher'

export default function BioPage() {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [avatarError, setAvatarError] = useState(false)

  useEffect(() => {
    const fetchPublicLinks = async () => {
      try {
        setLoading(true)
        const data = await getPublicLinks()
        setLinks(data.filter((l) => l.isActive !== false))
      } catch (err: any) {
        setError(err.message || 'Error al obtener los enlaces públicos')
      } finally {
        setLoading(false)
      }
    }
    fetchPublicLinks()
  }, [])

  return (
    <div className="relative overflow-hidden min-h-screen w-full bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-white flex flex-col items-center py-16 px-6 lg:px-12 select-none transition-colors duration-300">
      
      {/* Top Right Theme Switcher */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeSwitcher />
      </div>

      {/* Dynamic Neon Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-pink-500 to-purple-600 opacity-10 dark:opacity-20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-purple-600 to-indigo-500 opacity-10 dark:opacity-20 rounded-full blur-[100px] pointer-events-none" />

      {/* Sleek Neon diagonal ribbon crossing background */}
      <div className="absolute top-1/4 left-[-10%] w-[120%] h-32 bg-gradient-to-r from-pink-500/10 to-purple-600/10 dark:from-pink-500/20 dark:to-purple-600/20 -skew-y-6 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-[-10%] w-[120%] h-1 bg-gradient-to-r from-pink-500 via-pink-400 to-purple-600 -rotate-6 opacity-30 dark:opacity-75 shadow-[0_0_20px_rgba(219,39,119,0.3)] dark:shadow-[0_0_40px_rgba(219,39,119,0.6)] pointer-events-none -z-10" />

      <div className="w-full max-w-6xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
        
        {/* Left Column: Profile Card & Code Block (JSON config) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Profile Card */}
          <div className="bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-lg rounded-3xl p-8 transition-all duration-300">
            <div className="relative group inline-block">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
              <div className="relative w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-white/10">
                {!avatarError ? (
                  <img
                    src="/YO-FORMAL-CLARO.webp"
                    alt="Azael Reyes Martel"
                    onError={() => setAvatarError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-slate-900 dark:text-white text-2xl font-extrabold tracking-wider">
                    AR
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Azael Reyes Martel
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">
                Junior Frontend & Backend Developer &bull; WaaS & OpenBio Developer Suite
              </p>
            </div>
          </div>

          {/* Config Code Block (JSON representation) */}
          <div className="bg-slate-900 border border-slate-850 dark:bg-black/60 dark:border-white/10 dark:backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl font-mono text-[11px] text-slate-355 transition-all duration-300">
            <div className="bg-slate-950/60 dark:bg-black/40 px-4 py-2.5 border-b border-slate-850 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-slate-500 dark:text-slate-400 select-none text-[10px] ml-2">openbio-config.json</span>
              </div>
              <span className="text-slate-600 dark:text-slate-500 text-[9px] uppercase font-bold tracking-wider">JSON</span>
            </div>
            <div className="p-5 space-y-1 select-all overflow-x-auto">
              <p><span className="text-pink-500">{"{"}</span></p>
              <p className="pl-4"><span className="text-indigo-400">"developer"</span>: <span className="text-emerald-400">"Azael Reyes Martel"</span>,</p>
              <p className="pl-4"><span className="text-indigo-400">"role"</span>: <span className="text-emerald-400">"Junior Fullstack Developer"</span>,</p>
              <p className="pl-4"><span className="text-indigo-400">"architecture"</span>: <span className="text-emerald-400">"Edge Serverless"</span>,</p>
              <p className="pl-4"><span className="text-indigo-400">"stack"</span>: <span className="text-pink-500">{"["}</span></p>
              <p className="pl-8"><span className="text-emerald-400">"React 19"</span>, <span className="text-emerald-400">"TypeScript"</span>, <span className="text-emerald-400">"Tailwind"</span>,</p>
              <p className="pl-8"><span className="text-emerald-400">"Hono.js"</span>, <span className="text-emerald-400">"Cloudflare Workers"</span></p>
              <p className="pl-4"><span className="text-pink-500">{"]"}</span>,</p>
              <p className="pl-4"><span className="text-indigo-400">"security"</span>: <span className="text-emerald-400">"JWT Zero-Trust Access"</span></p>
              <p><span className="text-pink-500">{"}"}</span></p>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Bio Links List */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight transition-colors">
              Enlaces de Acceso
            </h2>
            <span className="text-xs font-semibold px-3 py-1 bg-slate-200/50 dark:bg-slate-900/60 border border-slate-300/40 dark:border-white/10 text-slate-600 dark:text-slate-400 rounded-full transition-colors duration-300">
              {links.length} Disponibles
            </span>
          </div>

          <div className="flex flex-col gap-4 w-full">
            {loading ? (
              <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3 bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-lg rounded-2xl">
                <svg className="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-sm font-medium">Cargando enlaces...</span>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center text-red-400 text-sm">
                {error}
              </div>
            ) : links.length === 0 ? (
              <div className="text-center text-slate-500 py-12 bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-lg rounded-2xl">
                <span className="text-sm">No hay enlaces públicos disponibles en este momento.</span>
              </div>
            ) : (
              links.map((link) => (
                <a
                  key={link.id}
                  href={`${import.meta.env.VITE_API_URL}/openbio/r/${link.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-lg hover:bg-slate-50 dark:hover:bg-white/10 hover:border-pink-500/40 dark:hover:border-pink-500/40 transition-all duration-200 p-4 rounded-2xl flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-black/40 flex items-center justify-center border border-slate-200 dark:border-white/10 text-indigo-500 dark:text-indigo-400 group-hover:text-pink-500 dark:group-hover:text-pink-500 group-hover:scale-105 transition-all duration-200">
                      <DynamicIcon name={link.icon} className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white transition-colors duration-200 text-sm">
                      {link.title}
                    </span>
                  </div>
                  
                  <svg className="w-5 h-5 text-slate-400 dark:text-slate-600 group-hover:text-pink-500 dark:group-hover:text-pink-500 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))
            )}
          </div>

          {/* Sutil Footer */}
          <footer className="pt-12 text-center select-none">
            <span className="text-[10px] text-slate-400 dark:text-slate-600 tracking-widest uppercase font-semibold">
              Powered by OpenBio &bull; WaaS Architecture
            </span>
          </footer>

        </div>

      </div>
    </div>
  )
}
