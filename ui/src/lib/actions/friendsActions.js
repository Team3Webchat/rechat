import { baseUrl } from './'
import { getHeaders } from '../api'
import { getUserId, getReportedByOthersCount } from '../selectors'

export const SEND_FRIEND_REQUEST = 'SEND_FRIEND_REQUEST'
export const GOT_FRIEND_REQUEST = 'GOT_FRIEND_REQUEST'
export const SEND_FRIEND_REQUEST_SUCCESS = 'SEND_FRIEND_REQUEST_SUCCESS'
export const SEND_FRIEND_REQUEST_FAILURE = 'SEND_FRIEND_REQUEST_FAILURE'
export const FRIEND_REQUEST_ACCEPTED = 'FRIEND_REQUEST_ACCEPTED'

export const sendFriendRequestSuccess = ({ flash, sentFriendRequests }) => ({
  type: SEND_FRIEND_REQUEST_SUCCESS,
  payload: {
    flash,
    sentFriendRequests,
  },
})

export const sendFriendRequestFailure = ({ flash }) => ({
  type: SEND_FRIEND_REQUEST_FAILURE,
  payload: {
    flash,
  },
})


export const sendFriendRequest = (friendId) => ({
  type: SEND_FRIEND_REQUEST,
  payload: {
    friendId,
  },
})

export const gotFriendRequest = friend => ({
  type: GOT_FRIEND_REQUEST,
  payload: {
    flash: {
      message: 'Got a friend request',
      type: 'success',
    },
    friend,
  },
})

export const friendRequestAccepted = ({friendId}) => ({
  type: FRIEND_REQUEST_ACCEPTED,
  payload: {
    friendId,
  },
})
  // async function(dispatch) {
  //   dispatch({
  //     type: SEND_FRIEND_REQUEST,
  //     payload: {
  //       friendId,
  //     }
  //   })
  //   try {
  //     const res = await fetch(`${baseUrl}users/${friendId}/friends`, {
  //       method: 'POST',
  //       headers: getHeaders(),
  //     })

  //     if (res.status === 400)
  //       throw new Error('You are already friends with this person')

  //     const json = await res.json()
  //     dispatch(sendFriendRequestSuccess({
  //       flash: {
  //         message: 'Friend request sent',
  //         type: 'success',
  //       },
  //       sentFriendRequests: json.sentFriendRequests,
  //     }))

  //   } catch(e) {
  //     dispatch(sendFriendRequestFailure({
  //       flash: {
  //         message: e.message,
  //         type: 'fail',
  //       },
  //     }))
  //   }
  // }



export const ACCEPT_FRIEND_REQUEST_SUCCESS = 'ACCEPT_FRIEND_REQUEST_SUCCESS'
export const ACCEPT_FRIEND_REQUEST_FAILURE = 'ACCEPT_FRIEND_REQUEST_FAILURE'

const acceptFriendRequestSuccess = ({ flash, friendId }) => ({
  type: ACCEPT_FRIEND_REQUEST_SUCCESS,
  payload: {
    flash,
    friendId,
  },
})

const acceptFriendRequestFailure = ({ flash }) => ({
  type: ACCEPT_FRIEND_REQUEST_FAILURE,
  payload: {
    flash,
  },
})

export const acceptFriendRequest = (friendId) =>
  async function(dispatch) {
    const userId = getUserId()
    try {
      const res = await fetch(`${baseUrl}users/${userId}/friends/${friendId}`, {
        method: 'PUT',
        headers: getHeaders(),
      })
      await res.json()
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



export const DELETE_FRIEND_SUCCESS = 'DELETE_FRIEND_SUCCESS'
export const DELETE_FRIEND_FAILURE = 'DELETE_FRIEND_FAILURE'

const deleteFriendSuccess = ({ flash, friendId }) => ({
  type: DELETE_FRIEND_SUCCESS,
  payload: {
    flash,
    friendId,
  },
})

const deleteFriendFailure = ({ flash }) => ({
  type: DELETE_FRIEND_FAILURE,
  payload: {
    flash,
  },
})

export const deleteFriend = (friendId) =>
  async function(dispatch) {
    const id = getUserId()
    try {
      const res = await fetch(`${baseUrl}users/${id}/friends/${friendId}`, {
        method: 'DELETE',
        headers: getHeaders(),
      })

      if (res.status === 403) throw new Error('Could not delete the friend')

      await res.json()
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

  //This is the code to post an report of a friend to the server/DB
export const REPORT_FRIEND_SUCCESS = 'REPORT_FRIEND_SUCCESS'
export const REPORT_FRIEND_FAILURE = 'REPORT_FRIEND_FAILURE'

const reportFriendSuccess = ({ flash, friendId }) => ({
  type: REPORT_FRIEND_SUCCESS,
  payload: {
    flash,
    friendId,
  },
})

const reportFriendFailure = ({ flash }) => ({
  type: REPORT_FRIEND_FAILURE,
  payload: {
    flash,
  },
})

export const reportFriend = (friendId) =>
function(dispatch) {
  fetch(`${baseUrl}users/${friendId}`,{
    method: 'GET',
    headers: getHeaders(),
  }).then(function (resp) {
    return resp.json()
  })
  .then(function (jsonres) {
    let res = null
    console.log(jsonres.reportedByOthersCount)
    const reportCount = jsonres.reportedByOthersCount + 1
    console.log('SKÄKRPNING!! ' + reportCount)
    try {
      if(reportCount < 3){
        res =  fetch(`${baseUrl}users/${friendId}/report`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify({
            'reportedByOthersCount': reportCount,
            'friendID': friendId,
          }),
        })
      }else{
        res =  fetch(`${baseUrl}users/${friendId}/report`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify({
            'reportedByOthersCount': reportCount,
            'isBanned': true,
            'friendID': friendId,
          }),
        })
      }
      if (res.status === 403) throw new Error('Could not report the friend')      
      dispatch(reportFriendSuccess({
        flash: {
          message: 'Friend reported!',
          type: 'success',
        },
        friendId,
      }))

    } catch (e) {
      console.log(e)
      dispatch(reportFriendFailure({
        flash: {
          message: e.message,
          type: 'fail',
        },
      }))
    }

  })
//  const reportCount = getReportedByOthersCount() + 1

}


export const GET_FRIENDS_SUCCESS = 'GET_FRIENDS_SUCCESS'
export const GET_FRIENDS_FAILURE = 'GET_FRIENDS_FAILURE'

export const getFriendSuccess = ({ friends, friendRequests, sentFriendRequests }) => ({
  type: GET_FRIENDS_SUCCESS,
  payload: {
    friends,
    friendRequests,
    sentFriendRequests,
  },
})

const getFriendsFailure = ({ flash }) => ({
  type: GET_FRIENDS_FAILURE,
  payload: {
    flash,
  },
})

export const getFriends = (id = getUserId()) =>
  async function(dispatch) {
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
