import { configureStore } from "@reduxjs/toolkit";
import konselorReducer from "./reducers/konselorReducer";

export default configureStore({
  reducer: {
    konselor: konselorReducer
  },
});
