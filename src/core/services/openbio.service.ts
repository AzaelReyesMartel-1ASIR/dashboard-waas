import { useAuthStore } from '../../store/authStore'

export interface LinkData {
  title: string
  url: string
  icon?: string
}

export interface Link {
  id: string
  title: string
  url: string
  icon: string | null
  sortOrder: number
  isActive: boolean
  clicks: number
  createdAt: string
  updatedAt: string
}

const getHeaders = () => {
  const token = useAuthStore.getState().token
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function getLinks(): Promise<Link[]> {
  const url = import.meta.env.VITE_API_URL + '/openbio'
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error('Error al obtener los enlaces')
  }

  const result = await response.json()
  return result.data || []
}

export async function createLink(data: LinkData): Promise<Link> {
  const url = import.meta.env.VITE_API_URL + '/openbio'
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Error al crear el enlace')
  }

  const result = await response.json()
  return result.data
}

export async function deleteLink(id: string): Promise<void> {
  const url = `${import.meta.env.VITE_API_URL}/openbio/${id}`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error('Error al eliminar el enlace')
  }
}

export async function getPublicLinks(): Promise<Link[]> {
  const url = import.meta.env.VITE_API_URL + '/openbio/public'
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Error al obtener los enlaces públicos')
  }

  const result = await response.json()
  return result.data || []
}
