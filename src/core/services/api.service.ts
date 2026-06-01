export async function loginAdmin(password: string): Promise<string> {
  const url = import.meta.env.VITE_API_URL + '/auth/login'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Credenciales inválidas')
    }
    throw new Error('Error al iniciar sesión')
  }

  const data = await response.json()
  return data.token
}
