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

const banUserFailure = ({ flash }) => ({
  type: BAN_USER_FAILURE,
  payload: {
    flash,
  },
})
export const banUser = (friendId) =>
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
    try {
      res =  fetch(`${baseUrl}users/${friendId}/ban`, {
        method: 'post',
        headers: getHeaders(),
        body: JSON.stringify({

        }),
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
          type: 'fail',
        },
      }))
    }

  })
//  const reportCount = getReportedByOthersCount() + 1

}
