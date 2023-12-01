import axios from "axios";

const initialState = {
  invoice: [],
  isLoading: false,
  isFulfilled: false,
  isErrored: {},
};

function invoiceReducer(state = initialState, action) {
  // create invoice
  switch (action.type) {
    case "POST_INVOICE_PENDING":
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isErrored: false,
      };
    case "POST_INVOICE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isErrored: action.payload,
      };
    case "POST_INVOICE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        invoice: action.payload,
      };
    default:
      return state;
  }
}

function postInvoicePending() {
  return {
    type: "POST_INVOICE_PENDING",
  };
}

function postInvoiceRejected(data) {
  return {
    type: "POST_INVOICE_REJECTED",
    payload: data,
  };
}

function postInvoiceFulfilled(invoice) {
  return {
    type: "POST_INVOICE_FULFILLED",
    payload: invoice,
  };
}

export function postInvoice(data, token) {
  return async function (dispatch) {
    dispatch(postInvoicePending());
    try {
      const response = await axios.post(
        `http://localhost:3000/payment`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(postInvoiceFulfilled(response.data));
    } catch (error) {
      dispatch(postInvoiceRejected(error.message));
    }
  };
}

export default invoiceReducer;
