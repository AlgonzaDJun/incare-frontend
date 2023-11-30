import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./reducers/user-reducer";
import  authReducer  from "./reducers/auth-reducer";
import quizReducer from "./reducers/quiz-reducer";
import conselorReducer from "./reducers/conselor-reducer";

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    quiz: quizReducer,
    conselor: conselorReducer
});

const store = configureStore({
    reducer: rootReducer
})

export default store;