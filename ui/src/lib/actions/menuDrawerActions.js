
export const TOGGLE_DELETE_FRIEND = 'TOGGLE_DELETE_FRIEND'
export const TOGGLE_PROFILE = 'TOGGLE_PROFILE'
export const EDIT_PROFILE = 'EDIT_PROFILE'
export const TOGGLE_CHAT_FRIEND = 'TOGGLE_CHAT_FRIEND'
export const COMPOSE_NEW_MESSAGE = 'COMPOSE_NEW_MESSAGE'

export const toggleDeleteFriend = () => ({
  type: TOGGLE_DELETE_FRIEND,
})

export const toggleProfile = () => ({
  type: TOGGLE_PROFILE,
})

export const editProfile = () => ({
  type: EDIT_PROFILE,
})

export const toggleChatFriend = () => ({
  type: TOGGLE_CHAT_FRIEND,
})

export const composeNewMessage = () => ({
  type: COMPOSE_NEW_MESSAGE,
})
