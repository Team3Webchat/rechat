import { TOGGLE_FRIENDS } from '../actions/menuDrawerActions'
import { LOGOUT_USER } from '../actions/authActions'

const initialState = {
  showFriends: false,
}
function menuDrawer(state = initialState, action) {

  switch(action.type){
    case TOGGLE_FRIENDS:
      return {
        showFriends: !state.showFriends,
      }
    case LOGOUT_USER:
      return initialState
    default: 
      return state
  }

}
export default menuDrawer