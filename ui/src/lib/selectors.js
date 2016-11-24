import store from './store'

export function getToken() {
  return store.getState().auth.token
}

export function getUserId() {
  console.log(store.getState())
  return store.getState().auth.id
}



