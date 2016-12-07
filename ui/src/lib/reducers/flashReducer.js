import { SHOW_ONE_USER_FAILURE } from '../actions/authActions'

const initialState = {
  message: null,
  type: null,
  persist: false,
}
/**
 * TODO: could use a refactor probably but it works

 */
export default function flash(state = initialState, action) {
  const { type } = action

  if (action.payload && action.payload.flash) {
    const { flash } = action.payload
    return { message: flash.message, type: flash.type, persist: flash.persistOnRouteTransition  }
  } else if (type === '@@router/LOCATION_CHANGE' && action.payload.action === 'POP' && !state.persist) {

    return initialState
  } else if (type === '@@router/LOCATION_CHANGE' && action.payload.action === 'POP' && state.persist) {

    return { ...state, persist: false }
  }

  return state
}
