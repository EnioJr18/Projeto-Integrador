const defaultApiBaseUrl = 'http://localhost:8000/api'

export function getApiBaseUrl() {
  return (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? defaultApiBaseUrl
}

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${getApiBaseUrl()}${normalizedPath}`
}

export async function fetchEventsFromApi() {
  const url = buildApiUrl('/eventos/')
  const res = await fetch(url, { credentials: 'include' })
  if (!res.ok) {
    throw new Error(`Erro ao buscar eventos: ${res.status}`)
  }
  return res.json()
}

export function buildEventDetailUrl(id: number | string) {
  return buildApiUrl(`/eventos/${id}/`)
}