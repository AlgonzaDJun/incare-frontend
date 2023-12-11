import { combineReducers } from "@reduxjs/toolkit";

import konselorReducer from "./reducers/konselorReducer";
import bookingReducer from "./reducers/bookingReducer";
import invoiceReducer from "./reducers/invoiceReducer";
import reviewReducer from "./reducers/reviewReducer";
import chatReducer from "./reducers/chatReducer";
import userReducer from "./reducers/userReducers";
import scheduleReducer from "./reducers/conselor-reducer";
import authReducer from "./reducers/auth-reducer";
import quizReducer from "./reducers/quiz-reducer";
import conselorReducer from "./reducers/conselor-reducer";

const rootReducer = combineReducers({
  konselor: konselorReducer,
  booking: bookingReducer,
  invoice: invoiceReducer,
  review: reviewReducer,
  chat: chatReducer,
  user: userReducer,
  auth: authReducer,
  schedule: scheduleReducer,
  quiz: quizReducer,
  conselor: conselorReducer,
});

export default rootReducer;
