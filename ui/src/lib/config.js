export const API_URL = getEnvVar('API_URL') || 'localhost:8000'

export function getEnvVar(key) {
  return process.env[key]  
}