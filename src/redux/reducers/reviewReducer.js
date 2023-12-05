import axios from "axios";

const initailState = {
  reviews: [],
  review: {},
  loading: false,
  error: null,
};

const reviewReducer = (state = initailState, action) => {
  switch (action.type) {
    case "GET_REVIEWS_PENDING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_REVIEWS_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "GET_REVIEWS_FULFILLED":
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      };
    case "GET_REVIEW_PENDING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_REVIEW_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "GET_REVIEW_FULFILLED":
      return {
        ...state,
        loading: false,
        review: action.payload,
      };
    case "POST_REVIEW_PENDING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "POST_REVIEW_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "POST_REVIEW_FULFILLED":
      return {
        ...state,
        loading: false,
        review: action.payload,
      };
    default:
      return state;
  }
};

// function post review
function postReviewPending() {
  return {
    type: "POST_REVIEW_PENDING",
  };
}

function postReviewRejected(error) {
  return {
    type: "POST_REVIEW_REJECTED",
    payload: error,
  };
}

function postReviewFulfilled(review) {
  return {
    type: "POST_REVIEW_FULFILLED",
    payload: review,
  };
}

export function postReview(id, review, token) {
  return async function (dispatch) {
    dispatch(postReviewPending());
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/review/${id}`,
        review,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(postReviewFulfilled(response.data));
    } catch (error) {
      dispatch(postReviewRejected(error.message));
    }
  };
}

export default reviewReducer;
