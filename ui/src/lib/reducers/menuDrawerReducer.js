import { TOGGLE_FRIENDS, TOGGLE_CHATS, TOGGLE_PROFILE, EDIT_PROFILE, TOGGLE_DELETE_FRIEND, TOGGLE_CHAT_FRIEND, COMPOSE_NEW_MESSAGE } from '../actions/menuDrawerActions'
import { LOGOUT_USER } from '../actions/authActions'

const initialState = {
  showFriends: false,
  showChats: false,
  showProfile: false,
  toggleDeleteFriend: false,
  isEditing: false,
  showChatFriend: false,
  isNewMessage: false,
}
function menuDrawer(state = initialState, action) {

  switch(action.type){
    case TOGGLE_FRIENDS:
      return {
        showFriends: !state.showFriends,
      }

    case TOGGLE_DELETE_FRIEND:
      return{
        toggleDeleteFriend: !state.toggleDeleteFriend,
      }  

    case TOGGLE_CHATS:
      return {
        showChats: !state.showChats,
      }

    case LOGOUT_USER:
      return initialState
    default:
      return state

    case TOGGLE_PROFILE:
      return {
        showProfile: !state.showProfile,
      }

    case EDIT_PROFILE:
      return{
        isEditing: !state.isEditing,
        showProfile: true,
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
