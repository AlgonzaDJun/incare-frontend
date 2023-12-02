import axios from "axios";

export function submitAnswers(newQuizResult, userId) {
    return {
        type: "SUBMIT_ANSWERS",
        payload: { newQuizResult, userId }
    }
};
export function quizAnswers(userId, userResults) {
    return async function(dispatch) {
            const response = await axios.post(
              `https://incare-backend-production.up.railway.app/hasilquizzes/quiz`,
              userResults
            );
            const newQuizResult = response.data;
            dispatch(submitAnswers(newQuizResult, userId));
            return newQuizResult;
      };
};
   
        
export function fetchAllResults(quizResults) {
    return {
        type: "FETCH_ALL_RESULTS",
        payload: quizResults
    }
} 

export function allResults () {
    return async function(dispatch) {
        const response = await axios.get(`https://incare-backend-production.up.railway.app/hasilquizzes`)
        const quizResults = response.data;
        dispatch(fetchAllResults(quizResults))
    }
}

export function fetchUserResults(userResults) {
    return {
        type: "FETCH_USER_RESULTS",
        payload: userResults
    }
}

export function userQuizResults(userId) {
   return async function(dispatch) {
    const response = await axios.get(`https://incare-backend-production.up.railway.app/hasilquizzes/${userId}`);
    const userResults = response.data;
    dispatch(fetchAllResults(userResults));
   }
}
        