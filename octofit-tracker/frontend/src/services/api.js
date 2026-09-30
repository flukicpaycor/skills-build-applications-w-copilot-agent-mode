const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const codespaceApiBaseUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`

function resolveApiBaseUrl() {
  if (codespaceName) {
    return codespaceApiBaseUrl
  }

  const currentHost = window.location.hostname
  const codespacesHostMatch = currentHost.match(/^(.*)-\d+\.app\.github\.dev$/)

  if (codespacesHostMatch) {
    return `https://${codespacesHostMatch[1]}-8000.app.github.dev/api`
  }

  return 'http://localhost:8000/api'
}

export const apiBaseUrl = resolveApiBaseUrl()

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  if (Array.isArray(payload.results)) {
    return payload.results
  }

  if (Array.isArray(payload.items)) {
    return payload.items
  }

  if (Array.isArray(payload.docs)) {
    return payload.docs
  }

  if (Array.isArray(payload.data)) {
    return payload.data
  }

  if (payload.data && typeof payload.data === 'object') {
    return normalizeCollection(payload.data)
  }

  return []
}

export async function fetchCollection(component) {
  const response = await fetch(`${apiBaseUrl}/${component}/`)

  if (!response.ok) {
    throw new Error(`Unable to load ${component}: ${response.status}`)
  }

  return normalizeCollection(await response.json())
}