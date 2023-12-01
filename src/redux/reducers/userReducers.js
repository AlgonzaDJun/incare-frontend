import axios from "axios";

const initialState = {
  user: [],
  isLoading: false,
  isFulfilled: false,
  isErrored: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isErrored: false,
      };
    case "GET_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isErrored: action.payload,
      };
    case "GET_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        user: action.payload,
      };
    default:
      return state;
  }
};

function getUserPending() {
  return {
    type: "GET_USER_PENDING",
  };
}

function getUserRejected(data) {
  return {
    type: "GET_USER_REJECTED",
    payload: data,
  };
}

function getUserFulfilled(user) {
  return {
    type: "GET_USER_FULFILLED",
    payload: user,
  };
}

export function getUserById(id) {
  return async function (dispatch) {
    dispatch(getUserPending());
    try {
      const { data } = await axios.get(
        "https://incare-backend-production.up.railway.app/users" + id
      );

      dispatch(getUserFulfilled(data));
    } catch (error) {
      dispatch(getUserRejected(error));
    }
  };
}

export default userReducer;
