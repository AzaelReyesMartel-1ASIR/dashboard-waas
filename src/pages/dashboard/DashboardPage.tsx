import { useEffect, useState } from 'react'
import { getLinks, createLink, deleteLink, updateLink } from '../../core/services/openbio.service'
import type { Link } from '../../core/services/openbio.service'
import DynamicIcon from '../../components/ui/DynamicIcon'
import { GripVertical } from 'lucide-react'

export default function DashboardPage() {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Form State
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [icon, setIcon] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const fetchLinks = async () => {
    try {
      setLoading(true)
      const data = await getLinks()
      const sorted = [...data].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      setLinks(sorted)
    } catch (err: any) {
      setError(err.message || 'Error al obtener los enlaces')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await createLink({
        title,
        url,
        icon: icon.trim() || undefined,
      })
      setTitle('')
      setUrl('')
      setIcon('')
      await fetchLinks()
    } catch (err: any) {
      setError(err.message || 'Error al crear el enlace')
    } finally {
      setIsSubmitting(false)
    }
  }

  const confirmDelete = async () => {
    if (!linkToDelete) return
    setError(null)
    setIsDeleting(true)

    try {
      await deleteLink(linkToDelete)
      setLinks((prev) => prev.filter((link) => link.id !== linkToDelete))
      setLinkToDelete(null)
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el enlace')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return

    const updated = [...links]
    const [draggedItem] = updated.splice(draggedIndex, 1)
    updated.splice(index, 0, draggedItem)

    // Set UI immediately (Optimistic Update)
    setLinks(updated)
    setDraggedIndex(null)

    try {
      // Massive synchronization: Update sortOrder for ALL elements to prevent colisions
      const promises = updated.map((link, idx) => {
        return updateLink(link.id, { sortOrder: idx })
      })
      await Promise.all(promises)
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el orden de los enlaces')
      fetchLinks()
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Gestor de Enlaces</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Crea, organiza y elimina los enlaces que se mostrarán en tu perfil bio de OpenBio.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 dark:shadow-none rounded-2xl p-6 backdrop-blur-xl relative transition-all duration-300">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Añadir nuevo enlace</h2>
        
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Título del Enlace
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Mi Portafolio"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 text-sm"
            />
          </div>

          <div>
            <label htmlFor="url" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              URL de Destino
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Ej. https://misitio.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 text-sm"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label htmlFor="icon" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Icono (Opcional)
              </label>
              <input
                id="icon"
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="Ej. github, twitter"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/30 hover:border-indigo-400/50 shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-200 disabled:opacity-50 h-[46px] shrink-0 font-medium"
            >
              {isSubmitting ? 'Creando...' : 'Crear'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
            {error}
          </div>
        )}
      </div>

      {/* Links List */}
      <div className="bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 dark:shadow-none rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Enlaces Activos</h2>
          <span className="text-xs bg-slate-100 dark:bg-white/5 text-slate-550 dark:text-slate-400 px-3 py-1 rounded-full font-medium">
            {links.length} Enlaces
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 flex flex-col items-center justify-center gap-3">
            <svg className="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Cargando tus enlaces...</span>
          </div>
        ) : links.length === 0 ? (
          <div className="p-12 text-center text-slate-400 dark:text-slate-500 flex flex-col items-center justify-center gap-3">
            <svg className="w-12 h-12 text-slate-350 dark:text-slate-700 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <p className="text-sm font-medium text-slate-755 dark:text-slate-400">No tienes enlaces creados todavía.</p>
            <p className="text-xs text-slate-500 dark:text-slate-655">Completa el formulario superior para añadir uno.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/20">
                  <th className="py-4 px-6">Título</th>
                  <th className="py-4 px-6">URL de Destino</th>
                  <th className="py-4 px-6">Icono</th>
                  <th className="py-4 px-6 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                {links.map((link, index) => (
                  <tr
                    key={link.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(index)}
                    className={`hover:bg-slate-100/50 dark:hover:bg-slate-800/20 transition-all duration-200 ${
                      draggedIndex === index ? 'opacity-40' : 'opacity-100'
                    }`}
                  >
                    <td className="py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                      <div className="text-slate-400 hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-400 cursor-grab active:cursor-grabbing transition-colors">
                        <GripVertical className="w-4 h-4" />
                      </div>
                      <span>{link.title}</span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400 font-mono select-all">
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">
                        {link.url}
                      </a>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">
                      <DynamicIcon name={link.icon} className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setLinkToDelete(link.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/10 border border-transparent hover:border-red-200 dark:hover:border-red-500/20 transition-all duration-200"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {linkToDelete !== null && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm px-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-xl dark:shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">¿Eliminar enlace permanente?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Esta acción eliminará el enlace de tu perfil de OpenBio de forma permanente. No se puede deshacer.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setLinkToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-150 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-150 disabled:opacity-50"
              >
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
