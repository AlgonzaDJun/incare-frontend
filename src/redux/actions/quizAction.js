import axios from "axios";

export function submitAnswers(newQuizResult) {
    return {
        type: "SUBMIT_ANSWERS",
        payload: newQuizResult
    }
};

export function quizAnswers(userId, userResults) {
    return async function (dispatch) {
      try {
        const response = await axios.post(
          `https://incare-backend-production.up.railway.app/hasilquizzes/quiz`,
          {
            user_id: "6568918ede239710c30ee578",
            answers: [5, 10, 10, 20, 20],
            questions: [
              "Question 1",
              "Question 2",
              "Question 3",
              "Question 4",
              "Question 5",
            ],
            mood: "Normal",
            score: 65,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const newQuizResult = await response.data;
        dispatch(submitAnswers(newQuizResult, userId));
      } catch (error) {
        console.log(error.message);
      }
    };
  }
   
        
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
        