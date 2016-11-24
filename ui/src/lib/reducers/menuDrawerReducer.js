import {
  SHOW_FRIENDS,
  DONT_SHOW_FRIENDS,
} from '../actions/menuDrawerActions'

const initialState = {
  showFriends: null,
}
function menuDrawer(state = initialState, action) {

  switch(action.type){

    case SHOW_FRIENDS:
      return{
        ...state,
        showFriends: true,
      }
    case DONT_SHOW_FRIENDS:
      return{
        ...state,
        showFriends: false,
      }
    default: return state
  }

}
export default menuDrawer