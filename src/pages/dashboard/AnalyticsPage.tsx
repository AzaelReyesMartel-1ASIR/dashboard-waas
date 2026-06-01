import { useEffect, useState, useMemo } from 'react'
import { getLinks } from '../../core/services/openbio.service'
import type { Link } from '../../core/services/openbio.service'

export default function AnalyticsPage() {
  const [links, setLinks] = useState<Link[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setIsLoading(true)
        const data = await getLinks()
        setLinks(data)
      } catch (err: any) {
        setError(err.message || 'Error al obtener los datos de analíticas')
      } finally {
        setIsLoading(false)
      }
    }
    fetchLinks()
  }, [])

  // Calculate metrics using useMemo
  const metrics = useMemo(() => {
    if (links.length === 0) {
      return {
        totalClicks: 0,
        activeLinks: 0,
        topLink: null,
      }
    }

    const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0)
    const activeLinks = links.filter((link) => link.isActive !== false).length

    // Sort to find the top link
    const sorted = [...links].sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
    const topLink = sorted[0] || null

    return {
      totalClicks,
      activeLinks,
      topLink,
    }
  }, [links])

  // Sort links by clicks descending for list rendering
  const sortedLinks = useMemo(() => {
    return [...links].sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
  }, [links])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Panel de Analíticas</h1>
        <p className="text-slate-400 text-sm mt-1">
          Visualiza el rendimiento de tus enlaces bio, total de interacciones y clics individuales.
        </p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3 bg-slate-900/30 border border-slate-800 rounded-2xl">
          <svg className="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Cargando analíticas...</span>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      ) : links.length === 0 ? (
        <div className="p-12 text-center text-slate-500 bg-slate-900/30 border border-slate-800 rounded-2xl">
          <svg className="w-12 h-12 text-slate-700 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-sm">No hay datos de rendimiento disponibles.</p>
          <p className="text-xs text-slate-600 mt-1">Crea enlaces en el gestor para comenzar a recopilar métricas.</p>
        </div>
      ) : (
        <>
          {/* KPI Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Clicks */}
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-300" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Clics Totales</span>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-4xl font-extrabold text-white tracking-tight">{metrics.totalClicks}</span>
                <span className="text-xs text-indigo-400 font-medium ml-1">interacciones</span>
              </div>
            </div>

            {/* Active Links */}
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-300" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Enlaces Activos</span>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-4xl font-extrabold text-white tracking-tight">{metrics.activeLinks}</span>
                <span className="text-xs text-slate-500 font-medium ml-1">de {links.length} totales</span>
              </div>
            </div>

            {/* Best Link */}
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-violet-500/10 transition-all duration-300" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mejor Enlace</span>
              {metrics.topLink ? (
                <div className="mt-3">
                  <span className="text-sm font-semibold text-slate-200 block truncate max-w-[250px]">
                    {metrics.topLink.title}
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-extrabold text-indigo-400 tracking-tight">
                      {metrics.topLink.clicks || 0}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">clics acumulados</span>
                  </div>
                </div>
              ) : (
                <span className="text-sm text-slate-500 block mt-4">Ninguno</span>
              )}
            </div>
          </div>

          {/* Performance Table */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-xl p-6">
            <h2 className="text-lg font-bold text-white mb-6">Rendimiento Individual</h2>
            
            <div className="space-y-6">
              {sortedLinks.map((link) => {
                const maxClicks = metrics.topLink?.clicks || 1
                const percent = Math.round(((link.clicks || 0) / maxClicks) * 100)
                
                return (
                  <div key={link.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-white block truncate">
                          {link.title}
                        </span>
                        <span className="text-xs text-slate-500 font-mono block truncate select-all">
                          {link.url}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold text-indigo-400 font-mono">
                          {link.clicks || 0}
                        </span>
                        <span className="text-xs text-slate-500 block">clics</span>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/60">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
