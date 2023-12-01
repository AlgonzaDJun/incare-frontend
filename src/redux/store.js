import { configureStore } from "@reduxjs/toolkit";
import konselorReducer from "./reducers/konselorReducer";
import bookingReducer from "./reducers/bookingReducer";

export default configureStore({
  reducer: {
    konselor: konselorReducer,
    booking: bookingReducer
  },
});
