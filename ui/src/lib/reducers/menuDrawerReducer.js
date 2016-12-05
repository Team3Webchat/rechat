import { TOGGLE_PROFILE, TOGGLE_DELETE_FRIEND, TOGGLE_CHAT_FRIEND, COMPOSE_NEW_MESSAGE } from '../actions/menuDrawerActions'
import { LOGOUT_USER } from '../actions/authActions'

const initialState = {
  showFriends: false,
  showChats: false,
  showProfile: false,
  isEditing: false,
  showChatFriend: false,
  isNewMessage: false,
}
function menuDrawer(state = initialState, action) {

  switch(action.type){

    case LOGOUT_USER:
      return initialState

    default:
      return state

    case TOGGLE_PROFILE:
      return {
        showProfile: !state.showProfile,
      }

    case TOGGLE_CHAT_FRIEND:
      return {
        showChatFriend: !state.showChatFriend,
      }

    case COMPOSE_NEW_MESSAGE:
      return{
        isNewMessage: !state.isNewMessage,
        showNewMessage: true,
      }
  }

}
export default menuDrawer
