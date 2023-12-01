import axios from "axios";

const initialState = {
  booking: [],
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

export default bookingReducer;
