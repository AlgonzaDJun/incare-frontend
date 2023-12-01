import { combineReducers } from "@reduxjs/toolkit";
import getStoriesReducer from "./slice/all-stories-slice";
import getStoryReducer from "./slice/story-slice";
import postStoryReducer from "./slice/post-story-slice";
import updateLikeReducer from "./slice/update-like-slice";
import addCommentReducer from "./slice/add-comment-slice";
import konselorReducer from "./reducers/konselorReducer";

const rootReducer = combineReducers({
  getStories: getStoriesReducer,
  postStory: postStoryReducer,
  updateLike: updateLikeReducer,
  story: getStoryReducer,
  addComment: addCommentReducer,
  konselor: konselorReducer,
});

export default rootReducer;
