import { baseUrl } from './'
import { getHeaders } from '../api'
import { getUserId } from '../selectors'

export const SEND_FRIEND_REQUEST_SUCCESS = 'SEND_FRIEND_REQUEST_SUCCESS'
export const SEND_FRIEND_REQUEST_FAILURE = 'SEND_FRIEND_REQUEST_FAILURE'

function sendFriendRequestSuccess({ flash, sentFriendRequests }) {
  return {
    type: SEND_FRIEND_REQUEST_SUCCESS,
    payload: {
      flash,
      sentFriendRequests,
    },
  }
}

function sendFriendRequestFailure({ flash }) {
  return {
    type: SEND_FRIEND_REQUEST_FAILURE,
    payload: {
      flash,
    },
  }
}

export function sendFriendRequest(friendId) {
  console.log('sendFriendRequest')
  return async function(dispatch) {
    console.log('Hehehe')
    const userId = getUserId()
    try {
      const res = await fetch(`${baseUrl}users/${friendId}/friends`, {
        method: 'POST',
        headers: getHeaders(),
      })
      console.log(res)
      if (res.status === 400) 
        throw new Error('You are already friends with this person')

      const json = await res.json()
      dispatch(sendFriendRequestSuccess({
        flash: {
          message: 'Friend request sent',
          type: 'success',
        },
        sentFriendRequests: json.sentFriendRequests,
      }))

    } catch(e) {
      dispatch(sendFriendRequestFailure({
        flash: {
          message: e.message,
          type: 'fail',
        },
      }))
    }
  }
}


export const ACCEPT_FRIEND_REQUEST_SUCCESS = 'ACCEPT_FRIEND_REQUEST_SUCCESS'
export const ACCEPT_FRIEND_REQUEST_FAILURE = 'ACCEPT_FRIEND_REQUEST_FAILURE'

function acceptFriendRequestSuccess({ flash, friendId }) {
  return {
    type: ACCEPT_FRIEND_REQUEST_SUCCESS,
    payload: {
      flash,
      friendId,
    },
  }

}

function acceptFriendRequestFailure({ flash }) {
  return {
    type: ACCEPT_FRIEND_REQUEST_FAILURE,
    payload: {
      flash,
    },
  }
}

export function acceptFriendRequest(friendId) {
  return async function(dispatch) {
    const userId = getUserId()
    try {
      const res = await fetch(`${baseUrl}users/${userId}/friends/${friendId}`, {
        method: 'PUT',
        headers: getHeaders(),
      })
      const json = await res.json()
      dispatch(acceptFriendRequestSuccess({
        flash: {
          message: 'You are now friends with a fella',
          type: 'success',
        },
        friendId,
      }))

    } catch(e) {
      // TODO: fix this with an error code, probably multiple things
      // can go wrong on the server
      dispatch(acceptFriendRequestFailure({
        flash: {
          message: 'You are not authorized to accept that friendship',
          type: 'fail',
        },
      }))
    }
  }
}


export const DELETE_FRIEND_SUCCESS = 'DELETE_FRIEND_SUCCESS'
export const DELETE_FRIEND_FAILURE = 'DELETE_FRIEND_FAILURE'

function deleteFriendSuccess({ flash, friendId }) {
  console.log(friendId)
  return {
    type: DELETE_FRIEND_SUCCESS,
    payload: {
      flash,
      friendId,
    },
  }

}

function deleteFriendFailure({ flash }) {
  return {
    type: DELETE_FRIEND_FAILURE,
    payload: {
      flash,
    },
  }
}

export function deleteFriend(friendId) {
  return async function(dispatch) {
    const id = getUserId()
    try {
      const res = await fetch(`${baseUrl}users/${id}/friends/${friendId}`, {
        method: 'DELETE',
        headers: getHeaders(),
      })

      if (res.status === 403) throw new Error('Could not delete the friend')

      const json = await res.json()
      console.log(friendId)
      dispatch(deleteFriendSuccess({
        flash: {
          message: 'Friend deleted!',
          type: 'success',
        },
        friendId,
      }))

    } catch (e) {
      dispatch(deleteFriendFailure({
        flash: {
          message: e.message,
          type: 'fail',
        },
      }))
    }
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

  return async function(dispatch) {
    try {
      const res = await fetch(`${baseUrl}users/${id}/friends`, {
        method: 'GET',
        headers: getHeaders(),
      })

      const json = await res.json()

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


