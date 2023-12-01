import { configureStore } from "@reduxjs/toolkit";
import konselorReducer from "./reducers/konselorReducer";
import bookingReducer from "./reducers/bookingReducer";
import invoiceReducer from "./reducers/invoiceReducer";

export default configureStore({
  reducer: {
    konselor: konselorReducer,
    booking: bookingReducer,
    invoice: invoiceReducer,
  },
});
