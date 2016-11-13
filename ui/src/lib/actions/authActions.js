import jwtDecode from 'jwt-decode'

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGOUT_USER = 'LOGOUT_USER'

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST,
  }
}

export function loginUserSuccess(token) {
  console.log("loginUserSucess()")
  localStorage.setItem('token', token) // move this elswhere later
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token,
    },
  }
}

export function loginUserFailure(error) {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusTest: error.response.statusText,
    },
  }
}

export function logout() {
  localStorage.removeItem('token')
  return {
    type: LOGOUT_USER,
  }
}

export function loginUser(username, password) {
  return async function(dispatch) {
    dispatch(loginUserRequest())
    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
        /*credentials: 'include', */ // Server has wildcard for cors atm
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      const json = await res.json()
      const decodedToken = jwtDecode(json.token)
      console.log(decodedToken)
      dispatch(loginUserSuccess(json.token))
    } catch(e) {
      dispatch(loginUserFailure({
        response: {
          status: 403,
          statusText: 'Invalid Token',
        },
      }))
    }
    
  }
}