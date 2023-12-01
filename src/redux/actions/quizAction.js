import axios from "axios";

export function submitAnswers(newQuizResult) {
    return {
        type: "SUBMIT_ANSWERS",
        payload: newQuizResult
    }
};
export function quizAnswers(userResults) {
    return async function(dispatch) {
        return axios.post(`https://incare-backend-production.up.railway.app/hasilquizzes/quiz`, userResults)
            .then(response => {
                const newQuizResult = response.data;
                dispatch(submitAnswers(newQuizResult));
            })
            .catch(error => {
                console.error('Error submitting quiz answers:', error);
                throw error; // Re-throw the error to propagate it further
            });
    }
}
        
export function fetchAllResults(quizResults) {
    return {
        type: "FETCH_ALL_RESULTS",
        payload: quizResults
    }
} 

export function allResults () {
    return async function(dispatch) {
        const response = await axios.get(`${BASE_URL}/hasilquizzes`)
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
        