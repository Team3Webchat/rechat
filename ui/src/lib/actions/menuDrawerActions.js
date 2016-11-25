import jwtDecode from 'jwt-decode'

import { baseUrl } from './'


// drawer actions
export const SHOW_FRIENDS = 'SHOW_FRIENDS'
export const DONT_SHOW_FRIENDS = 'DONT_SHOW_FRIENDS'
export const SHOW_CHATS = 'SHOW_CHATS'
export const DONT_SHOW_CHATS = 'DONT_SHOW_CHATS'
export const DRAWER_USER_FAILURE = 'DRAWER_USER_FAILURE'
export const TOGGLE_FRIENDS = 'TOGGLE_FRIENDS'
export const TOGGLE_CHATS = 'TOGGLE_CHATS'

export function showFriends() {
  return {
    type: SHOW_FRIENDS,
  }
}

export function dontShowFriends(){
  return{
    type: DONT_SHOW_FRIENDS,
  }
}

export function showChats() {
  return {
    type: SHOW_CHATS,
  }
}

export function dontShowChats(){
  return{
    type: DONT_SHOW_CHATS
  }
}

export function toggleFriends() {
  return {
    type: TOGGLE_FRIENDS,
  }
}

export function toggleChats() {
  // console.log("showing friends!")
  // return async function(dispatch) {
  //   if(!show){
  //     dispatch(showFriends())
  //   }else{
  //     dispatch(dontShowFriends())
  //   }
  // }
  return {
    type: TOGGLE_CHATS,
  }
}