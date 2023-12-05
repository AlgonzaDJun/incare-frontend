import { combineReducers } from "@reduxjs/toolkit";
import getStoriesReducer from "./slice/all-stories-slice";
import getStoryReducer from "./slice/story-slice";
import postStoryReducer from "./slice/post-story-slice";
import updateLikeReducer from "./slice/update-like-slice";
import addCommentReducer from "./slice/add-comment-slice";
import konselorReducer from "./reducers/konselorReducer";
import bookingReducer from "./reducers/bookingReducer";
import invoiceReducer from "./reducers/invoiceReducer";
import reviewReducer from "./reducers/reviewReducer";
import chatReducer from "./reducers/chatReducer";
import userReducer from "./reducers/user-reducer";
import authReducer from "./reducers/auth-reducer";
import quizReducer from "./reducers/quiz-reducer";
import conselorReducer from "./reducers/conselor-reducer";


const rootReducer = combineReducers({
  getStories: getStoriesReducer,
  postStory: postStoryReducer,
  updateLike: updateLikeReducer,
  story: getStoryReducer,
  addComment: addCommentReducer,
  konselor: konselorReducer,
  booking: bookingReducer,
  invoice: invoiceReducer,
  review: reviewReducer,
  chat: chatReducer,
  user: userReducer,
  auth: authReducer,
  quiz: quizReducer,
  conselor: conselorReducer
});

export default rootReducer;
