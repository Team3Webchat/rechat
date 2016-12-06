import { getToken } from './selectors'
export function getHeaders(customHeaders = {}) {
  const token = getToken()
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...customHeaders,
  }
  if (token)
    headers['Authorization'] = `Bearer ${token}`

  return headers
}
