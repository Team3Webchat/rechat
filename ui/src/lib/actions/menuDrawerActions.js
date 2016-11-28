
export const SHOW_FRIENDS = 'SHOW_FRIENDS'
export const DONT_SHOW_FRIENDS = 'DONT_SHOW_FRIENDS'
export const SHOW_CHATS = 'SHOW_CHATS'
export const DONT_SHOW_CHATS = 'DONT_SHOW_CHATS'
export const DRAWER_USER_FAILURE = 'DRAWER_USER_FAILURE'
export const TOGGLE_FRIENDS = 'TOGGLE_FRIENDS'
export const TOGGLE_CHATS = 'TOGGLE_CHATS'
export const TOGGLE_PROFILE = 'TOGGLE_PROFILE'
export const EDIT_PROFILE = 'EDIT_PROFILE'

export const showFriends = () => ({
  type: SHOW_FRIENDS,
})

export const dontShowFriends = () => ({
  type: DONT_SHOW_FRIENDS,
})

export const showChats = () => ({
  type: SHOW_CHATS,
})

export const dontShowChats = () => ({
  type: DONT_SHOW_CHATS,
})

export const toggleFriends = () => ({
  type: TOGGLE_FRIENDS,
})

export const toggleChats = () => ({
  type: TOGGLE_CHATS,
})

export const toggleProfile = () => ({
  type: TOGGLE_PROFILE,
})

export const editProfile = () => ({
  type: EDIT_PROFILE,
})
