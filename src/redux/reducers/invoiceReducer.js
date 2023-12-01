import axios from "axios";

const initialState = {
  invoice: [],
  isLoading: false,
  isFulfilled: false,
  isErrored: {},
  allInvoice: [],
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
    case "GET_ALL_INVOICE_PENDING":
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isErrored: false,
      };
    case "GET_ALL_INVOICE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isErrored: action.payload,
        isFulfilled: false,
      };
    case "GET_ALL_INVOICE_FULFILLED":
      return {
        ...state,
        allInvoice: action.payload,
        isLoading: false,
        isFulfilled: true,
        isErrored: false,
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

function getAllInvoicePending() {
  return {
    type: "GET_ALL_INVOICE_PENDING",
  };
}

function getAllInvoiceRejected(data) {
  return {
    type: "GET_ALL_INVOICE_REJECTED",
    payload: data,
  };
}

function getAllInvoiceFulfilled(invoice) {
  return {
    type: "GET_ALL_INVOICE_FULFILLED",
    payload: invoice,
  };
}

export function postInvoice(data, token) {
  return async function (dispatch) {
    dispatch(postInvoicePending());
    try {
      const response = await axios.post(`http://13.210.51.154:3000/payment`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(postInvoiceFulfilled(response.data));
    } catch (error) {
      dispatch(postInvoiceRejected(error.message));
    }
  };
}

export function getAllInvoice() {
  return async function (dispatch) {
    dispatch(getAllInvoicePending());
    try {
      const { data } = await axios.get(`http://13.210.51.154:3000/payment`);
      dispatch(getAllInvoiceFulfilled(data));
    } catch (error) {
      dispatch(getAllInvoiceRejected(error.message));
    }
  };
}

export default invoiceReducer;
