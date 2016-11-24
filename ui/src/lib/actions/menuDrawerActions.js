import jwtDecode from 'jwt-decode'

import { baseUrl } from './'


// drawer actions
export const SHOW_FRIENDS = 'SHOW_FRIENDS'
export const DONT_SHOW_FRIENDS = 'DONT_SHOW_FRIENDS'
export const DRAWER_USER_FAILURE = 'DRAWER_USER_FAILURE'
export const TOGGLE_FRIENDS = 'TOGGLE_FRIENDS'

export function showFriends() {
  return {
    type: SHOW_FRIENDS,
  }
}

export function dontShowFriends(){
  return{
    type: DONT_SHOW_FRIENDS
  }
}

export function toggleFriends() {
  // console.log("showing friends!")
  // return async function(dispatch) {
  //   if(!show){
  //     dispatch(showFriends())
  //   }else{
  //     dispatch(dontShowFriends())
  //   }
  // }
  return {
    type: TOGGLE_FRIENDS,
  }
}