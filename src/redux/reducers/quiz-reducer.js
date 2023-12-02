const initialState = {
    quizResults:[],
    userResults: null,
}

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SUBMIT_ANSWERS":
            const { newQuizResult, userId}  = action.payload;
            return {
                ...state,
                userResults: {...newQuizResult, userId }
            };
        case "FETCH_ALL_RESULTS":
            return {
                ...state,
                quizResults: action.payload
            };
        case "FETCH_USER_RESULTS":
            return {
                ...state,
                userResults: action.payload.data,
            }
        default:
            return state;
    }      
};

export default quizReducer;