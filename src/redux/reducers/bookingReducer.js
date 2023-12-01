import axios from "axios";

const initialState = {
  booking: [],
  allBooking: [],
  isLoading: false,
  isFulfilled: false,
  isErrored: {},
};

function bookingReducer(state = initialState, action) {
  // create booking
  switch (action.type) {
    case "POST_BOOKING_PENDING":
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isErrored: false,
      };
    case "POST_BOOKING_REJECTED":
      return {
        ...state,
        isLoading: false,
        isErrored: action.payload,
      };
    case "POST_BOOKING_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        booking: action.payload,
      };
    case "GET_BOOKING_PENDING":
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isErrored: false,
      };
    case "GET_BOOKING_REJECTED":
      return {
        ...state,
        isLoading: false,
        isErrored: action.payload,
      };
    case "GET_BOOKING_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        booking: action.payload,
      };
    case "GET_ALL_BOOKING_FULLFILED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        allBooking: action.payload,
      };

    default:
      return state;
  }
}

function postBookingPending() {
  return {
    type: "POST_BOOKING_PENDING",
  };
}

function postBookingRejected(data) {
  return {
    type: "POST_BOOKING_REJECTED",
    payload: data,
  };
}

function postBookingFulfilled(booking) {
  return {
    type: "POST_BOOKING_FULFILLED",
    payload: booking,
  };
}

function getBookingPending() {
  return {
    type: "GET_BOOKING_PENDING",
  };
}

function getBookingRejected(data) {
  return {
    type: "GET_BOOKING_REJECTED",
    payload: data,
  };
}

function getBookingFulfilled(booking) {
  return {
    type: "GET_BOOKING_FULFILLED",
    payload: booking,
  };
}

function getAllBookingFulfilled(booking) {
  return {
    type: "GET_ALL_BOOKING_FULLFILED",
    payload: booking,
  };
}

export function postBooking(data, token) {
  return async function (dispatch) {
    dispatch(postBookingPending());
    try {
      const response = await axios.post(
        `https://incare-backend-production.up.railway.app/booking`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(postBookingFulfilled(response.data));
    } catch (error) {
      dispatch(postBookingRejected(error.message));
    }
  };
}

export function getBookingById(id) {
  return async function (dispatch) {
    dispatch(getBookingPending());
    try {
      const { data } = await axios.get(
        "https://incare-backend-production.up.railway.app/booking/" + id
      );

      dispatch(getBookingFulfilled(data));
    } catch (error) {
      dispatch(getBookingRejected(error));
    }
  };
}

export function updateStatusByidBooking(id, data) {
  return async function (dispatch) {
    dispatch(postBookingPending());
    try {
      const response = await axios.put(
        `https://incare-backend-production.up.railway.app/booking/${id}`,
        data
      );
      dispatch(postBookingFulfilled(response.data));
    } catch (error) {
      dispatch(postBookingRejected(error.message));
    }
  };
}

export function getAllBooking(token) {
  return async function (dispatch) {
    dispatch(getBookingPending());
    try {
      const { data } = await axios.get(
        "https://incare-backend-production.up.railway.app/booking/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getAllBookingFulfilled(data));
    } catch (error) {
      dispatch(getBookingRejected(error));
    }
  };
}

export default bookingReducer;
