import { baseUrl } from './'
import { getHeaders } from '../api'

export const BAN_USER = 'BAN_USER'
export const UNBAN_USER = 'UNBAN_USER'
export const BAN_USER_SUCCESS = 'BAN_USER_SUCCESS'
export const BAN_USER_FAILURE = 'BAN_USER_FAILURE'
export const UNBAN_USER_SUCCESS = 'UNBAN_USER_SUCCESS'
export const UNBAN_USER_FAILURE = 'UNBAN_USER_FAILURE'

const banUserSuccess = ({ flash }) => ({
  type: BAN_USER_SUCCESS,
  payload: {
    flash,
  },
})
export const banUserFailure = ({ flash }) => ({
  type: BAN_USER_FAILURE,
  payload: {
    flash,
  },
})


const unbanUserSuccess = ({ flash }) => ({
  type: BAN_USER_SUCCESS,
  payload: {
    flash,
  },
})
const unbanUserFailure = ({ flash }) => ({
  type: BAN_USER_FAILURE,
  payload: {
    flash,
  },
})
export const banUser = (friendId) =>

function(dispatch) {
  console.log(friendId)
  console.log('bajs')
  try {
    let res =  fetch(`${baseUrl}users/${friendId}/ban`, {
      method: 'post',
      headers: getHeaders(),
    })
    if (res.status === 403) throw new Error('Could not ban the user')
    dispatch(banUserSuccess({
      flash: {
        message: 'User banned!',
        type: 'success',
      },
      friendId,
    }))

  } catch (e) {
    console.log(e)
    dispatch(banUserFailure({
      flash: {
        message: e.message,
        type: 'failed to ban user',
      },
    }))
  }
}

export const unbanUser = (friendId) =>

function(dispatch) {
  console.log(friendId)
  console.log('bajs')
  try {
    let res =  fetch(`${baseUrl}users/${friendId}/unban`, {
      method: 'post',
      headers: getHeaders(),
    })
    if (res.status === 403) throw new Error('Could not unban the user')
    dispatch(unbanUserSuccess({
      flash: {
        message: 'User unbanned!',
        type: 'success',
      },
      friendId,
    }))

  } catch (e) {
    console.log(e)
    dispatch(unbanUserFailure({
      flash: {
        message: e.message,
        type: 'failed to unban user',
      },
    }))
  }
}
