const initialState = {
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null,
    otpSent: false
}

function authReducer (state = initialState, action) {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return {
                isLoggingIn: true
            };
        case "LOGIN_SUCCESS":
            return {
               isLoggedIn: true
            };
        case "LOGIN_FAILURE":
        case "REGISTER_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "REGISTER_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                loading: false,
                user: action.payload,
                error: null,
            };
        case "REGISTER_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "OTP_REQUEST":
           return {
               ...state,
               loading: true,
               error: null,
            };
        case "OTP_SUCCESS":
          return {
              ...state,
              loading: false,
              otpSent: true, 
            };
        case "OTP_FAILURE":
          return {
              ...state,
              loading: false,
              error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;