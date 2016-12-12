export const API_URL = getEnvVar('REACT_APP_API_URL') || 'localhost:8000'

export function getEnvVar(key) {
  return process.env[key]  
}