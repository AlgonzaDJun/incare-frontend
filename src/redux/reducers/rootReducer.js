import { combineReducers } from "@reduxjs/toolkit";

import konselorReducer from "./konselorReducer";

import bookingReducer from "./bookingReducer";
import invoiceReducer from "./invoiceReducer";
import reviewReducer from "./reviewReducer";
import faqReducer from "./faqReducer";
import storyReducer from "./storyReducer";

const rootReducer = combineReducers({
  story: storyReducer,
  konselor: konselorReducer,
  booking: bookingReducer,
  invoice: invoiceReducer,
  review: reviewReducer,
  faq: faqReducer,
});

export default rootReducer;
