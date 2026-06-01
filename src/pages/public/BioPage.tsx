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

  const glassStyle = "backdrop-blur-xl rounded-2xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-lg dark:shadow-none transition-all"

  return (
    <div className="relative min-h-screen w-full text-slate-900 dark:text-white flex flex-col items-center py-16 px-6 lg:px-12 select-none transition-colors duration-500">

      {/* Tech/SaaS Background (Fixed Base + Dot Pattern + Animated Mesh Orbs) */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        {/* Capa 1: Color Base */}
        <div className="absolute inset-0 bg-slate-50 dark:bg-[#05050A] transition-colors duration-700" />

        {/* Capa 2: Dot Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-50 dark:opacity-70" />

        {/* Capa 3: Orbes Animados */}
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-fuchsia-500/20 dark:bg-purple-700/20 rounded-full blur-[100px] animate-pulse mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-blue-500/20 dark:bg-cyan-700/20 rounded-full blur-[100px] animate-pulse mix-blend-multiply dark:mix-blend-screen pointer-events-none [animation-delay:2s]" />
      </div>

      {/* Top Right Theme Switcher */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeSwitcher />
      </div>

      {/* Main Content Grid with Strict DOM Order: 1. Perfil, 2. Enlaces, 3. Terminal, 4. Footer */}
      <div className="w-full max-w-6xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">

        {/* 1. Cabecera / Perfil Card */}
        <div className={`lg:col-span-5 p-8 ${glassStyle}`}>
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
              Junior Frontend y Backend Developer &bull; WaaS & OpenBio Developer Suite
            </p>
          </div>
        </div>

        {/* 2. Enlaces Card (Spans 2 rows on desktop) */}
        <div className={`lg:col-span-7 lg:row-span-2 p-8 space-y-6 ${glassStyle}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Enlaces de Acceso
            </h2>
            <span className="text-xs font-semibold px-3 py-1 bg-slate-200/50 dark:bg-white/5 border border-slate-300/40 dark:border-white/10 text-slate-600 dark:text-slate-400 rounded-full">
              {links.length} Disponibles
            </span>
          </div>

          <div className="flex flex-col gap-4 w-full">
            {loading ? (
              <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
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
              <div className="text-center text-slate-500 py-12">
                <span className="text-sm">No hay enlaces públicos disponibles en este momento.</span>
              </div>
            ) : (
              links.map((link) => (
                <a
                  key={link.id}
                  href={`${import.meta.env.VITE_API_URL}/openbio/r/${link.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-pink-500/40 dark:hover:border-pink-500/40 transition-all duration-200 p-4 rounded-2xl flex items-center justify-between group shadow-sm hover:shadow-md dark:shadow-none"
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
        </div>

        {/* 3. Terminal Card */}
        <div className="lg:col-span-5 overflow-hidden font-mono text-[10px] rounded-2xl bg-slate-950 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none transition-all">
          <div className="bg-slate-200 dark:bg-white/5 px-4 py-2.5 border-b border-slate-300 dark:border-white/10 flex items-center justify-between transition-colors duration-300">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <span className="w-2 h-2 rounded-full bg-green-500/80" />
              </div>
              <span className="text-slate-500 dark:text-slate-400 select-none text-[9px] ml-2">openbio-config.json</span>
            </div>
            <span className="text-slate-600 dark:text-slate-500 text-[8px] uppercase font-bold tracking-wider">JSON</span>
          </div>
          <div className="p-5 space-y-1 select-all overflow-x-auto bg-slate-950 text-slate-300">
            <p><span className="text-pink-500">{"{"}</span></p>
            <p className="pl-4"><span className="text-indigo-400">"developer"</span>: <span className="text-emerald-400">"Azael Reyes"</span>,</p>
            <p className="pl-4"><span className="text-indigo-400">"role"</span>: <span className="text-emerald-400">"Fullstack Junior"</span>,</p>
            <p className="pl-4"><span className="text-indigo-400">"stack"</span>: <span className="text-pink-500">{"["}</span></p>
            <p className="pl-8"><span className="text-emerald-400">"React 19"</span>, <span className="text-emerald-400">"Tailwind"</span>,</p>
            <p className="pl-8"><span className="text-emerald-400">"Hono"</span>, <span className="text-emerald-400">"Workers"</span></p>
            <p className="pl-4"><span className="text-pink-500">{"]"}</span>,</p>
            <p className="pl-4"><span className="text-indigo-400">"auth"</span>: <span className="text-emerald-400">"Zero-Trust with private token"</span></p>
            <p><span className="text-pink-500">{"}"}</span></p>
          </div>
        </div>

        {/* 4. Sutil Footer */}
        <footer className="lg:col-span-12 text-center select-none py-6">
          <span className="text-[10px] text-slate-400 dark:text-slate-600 tracking-widest uppercase font-semibold">
            Powered by OpenBio &bull; WaaS Architecture
          </span>
        </footer>

      </div>
    </div>
  )
}
