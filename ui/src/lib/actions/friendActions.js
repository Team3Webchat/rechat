import { baseUrl } from './'
import { getHeaders } from '../api'
import { getUserId } from '../selectors'

export const SEND_FRIEND_REQUEST_SUCCESS = 'SEND_FRIEND_REQUEST_SUCCESS'
export const SEND_FRIEND_REQUEST_FAILURE = 'SEND_FRIEND_REQUEST_FAILURE'

function sendFriendRequestSuccess() {

}

function sendFriendRequestFailure() {

}

export function sendFriendRequest(friendId) {
  return async function(dispatch) {
    
  }
}


export const GET_FRIENDS_SUCCESS = 'GET_FRIENDS_SUCCESS'
export const GET_FRIENDS_FAILURE = 'GET_FRIENDS_FAILURE'

function getFriendSuccess({ friends, friendRequests, sentFriendRequests }) {
  return {
    type: GET_FRIENDS_SUCCESS,
    payload: {
      friends,
      friendRequests,
      sentFriendRequests,
    },
  }
}

function getFriendsFailure({ flash }) {
  return {
    type: GET_FRIENDS_FAILURE,
    payload: {
      flash,
    },
  }
}

export function getFriends(id = getUserId()) {
  console.log(getUserId())
  return async function(dispatch) {
    try {
      const res = await fetch(`${baseUrl}users/${id}/friends`, {
        method: 'GET',
        headers: getHeaders(),
      })
      console.log(res)
      const json = await res.json()
      console.log(json)
      dispatch(getFriendSuccess({
        friends: json.friends,
        friendRequests: json.friendRequests,
        sentFriendRequests: json.sentRequests,
      }))

    } catch (e) {
      dispatch(getFriendsFailure({
        flash: {
          message: 'Could not get friends..',
          type: 'fail',
        },
      }))
    }
  }
}


