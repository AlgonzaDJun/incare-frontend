import axios from "axios";

const initialState = {
  user: [],
  profile: {},
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
    case "GET_PROFILE_PENDING":
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isErrored: false,
      };
    case "GET_PROFILE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isErrored: action.payload,
      };
    case "GET_PROFILE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        profile: action.payload,
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

function getProfilePending() {
  return {
    type: "GET_PROFILE_PENDING",
  };
}

function getProfileRejected(profile) {
  return {
    type: "GET_PROFILE_REJECTED",
    payload: profile,
  };
}

function getProfileFulfilled(profile) {
  return {
    type: "GET_PROFILE_FULFILLED",
    payload: profile,
  };
}

export function getUserById(id) {
  return async function (dispatch) {
    dispatch(getUserPending());
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/users` + id
      );

      dispatch(getUserFulfilled(data));
    } catch (error) {
      dispatch(getUserRejected(error));
    }
  };
}

export function getProfilUser() {
  return async function (dispatch) {
    dispatch(getProfilePending());
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/users/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getProfileFulfilled(data.data));
    } catch (error) {
      dispatch(getProfileRejected(error));
    }
  };
}

export default userReducer;
