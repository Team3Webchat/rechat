export const NODE_ENV = getEnvVar('NODE_ENV') || 'development'
export const API_URL = NODE_ENV === 'production' ? 'https://apirechat.herokuapp.com' : 'http://localhost:8000'

export function getEnvVar(key) {
  return process.env[key]  
}