import axios from "axios"

const BASE_URL = "http://localhost:3000"

export function loginRequest(data) {
    return {
        type: "LOGIN_REQUEST",
        payload: data,
    }
};

export function loginSuccess(user) {
    localStorage.setItem('user', JSON.stringify(user));
    return {
        type: "LOGIN_SUCCESS",
        payload: user,
    }
};

export function loginFailure(error) {
    return {
        type: "LOGIN_FAILURE",
        payload: error,
    }
};

export function registerRequest(data) {
    return {
        type: "REGISTER_REQUEST",
        payload: data,
    }
};

export function registerSuccess(user) {
    return {
        type: "REGISTER_SUCCESS",
        payload: user,
    }
};

export function registerFailure(error) {
    return {
        type: "REGISTER_FAILURE",
        payload: error,
    }
};

export function sendOTPRequest(data) {
    return {
      type: "OTP_REQUEST",
      payload: data,
    }
  };
  
  export function sendOTPSuccess(response) {
    return {
      type: "OTP_SUCCESS",
      payload: response,
    }
  };
  
  export function sendOTPFailure(error) {
    return {
      type: "OTP_FAILURE",
      payload: error,
    }
  };

export function userLogin(data) {
    return async function(dispatch) {
        dispatch(loginRequest(data));

      axios.post(`${BASE_URL}/auth/login`, data)
            .then(response => {
                const user = response.data;
                dispatch(loginSuccess(user));
            })
            .catch(error => {
                dispatch(loginFailure(error.message));
            });
    };
}

export function userRegister(data) {
    return async function(dispatch) {
        dispatch(registerRequest(data));

        axios.post(`${BASE_URL}/auth/register`, data)
            .then(response => {
                const user = response.data;
                dispatch(registerSuccess(user));
            })
            .catch(error => {
                dispatch(registerFailure(error.message));
            });
    };
}

export function sendOTP(data) {
    return async function(dispatch) {
      dispatch(sendOTPRequest(data));
  
      return axios.post(`${BASE_URL}/auth/send-otp`, data)
        .then(response => {
          dispatch(sendOTPSuccess(response.data));
        })
        .catch(error => {
          dispatch(sendOTPFailure(error.message));
        });
    };
  }

const authAction = {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    userLogin,
    userRegister,

}

export default authAction;