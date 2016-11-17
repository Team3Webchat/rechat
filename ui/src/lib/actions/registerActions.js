// Register actions
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE'

export function registerUserRequest() {
  return {
    type: REGISTER_USER_REQUEST,
  }
}

export function registerUserSuccess({token, message}) {
  return {
    type: REGISTER_USER_SUCCESS, 
    payload: {
      token,
      message,
    },
  }
}

export function registerUserFailure(error) {
  return {
    type: REGISTER_USER_FAILURE, 
    payload: {
      error,
    },
  }
}

export function registerUser({ email, password }) {
  return async function(dispatch) {
    dispatch(registerUserRequest())
    try {
      const res = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        /*credentials: 'include', */ // Server has wildcard for cors atm
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },  
      })

      console.log(res)
      const json = await res.json()
      const { message, token } = json
      dispatch(registerUserSuccess({ token, message}))

    } catch(e) {
      dispatch(registerUserFailure())
    }
  }
}