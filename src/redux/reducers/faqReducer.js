import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const faqReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FAQS_PENDING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_FAQS_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "GET_FAQS_FULFILLED":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    default:
      return state;
  }
};

function getFaqsRejected(error) {
  return {
    type: "GET_FAQS_REJECTED",
    payload: error,
  };
}

function getFaqsPending() {
  return {
    type: "GET_FAQS_PENDING",
  };
}
function getFaqsFullFilled(data) {
  return {
    type: "GET_FAQS_FULFILLED",
    payload: data,
  };
}

export function getFaqs() {
  return async function (dispatch) {
    dispatch(getFaqsPending());
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/faqs`
      );
      dispatch(getFaqsFullFilled(response.data.data));
    } catch (error) {
      dispatch(getFaqsRejected(error));
    }
  };
}

export default faqReducer;
