import store from './store'

export function getToken() {
  return store.getState().auth.token
}

export function getUserId() {

  return store.getState().auth.id
}

export function getReportedByOthersCount() {

  return store.getState().auth.reportedByOthersCount
}
