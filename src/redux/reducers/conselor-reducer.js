const initialState = {
  user: null,
  schedules: [],
  loading: false,
  error: null,
};

const conselorReducer = (state = initialState, action) => {
  switch (action.type) {
    // case "REGISTER_CONSELOR_REQUEST":
    // case "SAVE_SCHEDULE_REQUEST":
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
    case "SAVE_SCHEDULE_SUCCESS":
      return {
        ...state,
        schedules: action.payload,
        loading: false,
      };
    case "UPDATE_SCHEDULE_SUCCESS":
      return {
        ...state,
        schedules: action.payload,
        loading: false,
      };
    // case "REGISTER_CONSELOR_FAILURE":
    // case "SAVE_SCHEDULE_FAILURE":
    case "UPDATE_SCHEDULE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "GET_SCHEDULE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_SCHEDULE_SUCCESS":
      return {
        ...state,
        schedules: action.payload,
        loading: false,
      };
    case "GET_SCHEDULE_FAILED":
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
