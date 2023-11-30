const initialState = {
    user: {},
    // cv: {},
    schedule: [{}],
    loading: false,
    error: null,
  };
  
  const conselorReducer = (state = initialState, action) => {
    switch (action.type) {
      case "REGISTER_CONSELOR_REQUEST":
      // case "UPLOAD_CV_REQUEST":
      case "SAVE_SCHEDULE_REQUEST":
      case "UPDATE_SCHEDULE_REQUEST":
        return {
          ...state,
          loading: true,
          error: null,
        };
      case "REGISTER_CONSELOR_SUCCESS":
        return {
          ...state,
          user: action.payload,
          loading: false,
        };
      // case "UPLOAD_CV_SUCCESS":
      //   return {
      //     ...state,
      //     cv: action.payload,
      //     loading: false,
      //   };
      case "SAVE_SCHEDULE_SUCCESS":
      case "UPDATE_SCHEDULE_SUCCESS":
        return {
          ...state,
          schedule: action.payload,
          loading: false,
        };
      case "REGISTER_CONSELOR_FAILURE":
      // case "UPLOAD_CV_FAILURE":
      case "SAVE_SCHEDULE_FAILURE":
      case "UPDATE_SCHEDULE_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default conselorReducer;