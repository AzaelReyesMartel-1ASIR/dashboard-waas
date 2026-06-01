import { useEffect, useState } from 'react'
import { getPublicLinks } from '../../core/services/openbio.service'
import type { Link } from '../../core/services/openbio.service'
import DynamicIcon from '../../components/ui/DynamicIcon'

export default function BioPage() {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center py-16 px-4 select-none relative overflow-hidden">
      {/* Background ambient lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center z-10">
        {/* Cabecera / Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
            <div className="relative w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center text-white text-3xl font-extrabold tracking-wider border border-slate-800">
              AR
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Azael Reyes Martel</h1>
            <p className="text-slate-400 text-sm mt-1.5 max-w-xs">
              Arquitecto Frontend y Backend Junior &bull; Waas & OpenBio Developer Suite
            </p>
          </div>
        </div>

        {/* Enlaces / Links */}
        <div className="flex flex-col gap-4 w-full max-w-md mt-10">
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
              <span className="text-sm">No hay enlaces públicos disponibles.</span>
            </div>
          ) : (
            links.map((link) => (
              <a
                key={link.id}
                href={`${import.meta.env.VITE_API_URL}/openbio/r/${link.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700/60 transition-all duration-200 p-4 rounded-xl flex items-center justify-between group shadow-lg hover:shadow-[0_0_15px_rgba(99,102,241,0.1)]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-200">
                    <DynamicIcon name={link.icon} className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-200 group-hover:text-white transition-colors duration-200 text-sm">
                    {link.title}
                  </span>
                </div>

                <svg className="w-5 h-5 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <span className="text-xs text-slate-600 tracking-wider uppercase font-medium">
            Powered by OpenBio &bull; WaaS
          </span>
        </footer>
      </div>
    </div>
  )
}
