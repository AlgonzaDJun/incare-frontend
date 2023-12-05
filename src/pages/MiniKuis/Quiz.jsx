import { useDispatch, useSelector } from "react-redux";
import { quizAnswers, userQuizResults } from "../../redux/actions/quizAction";
import { useEffect, useState } from "react";
import ResultPage from "./ResultPage";
import { userLogin } from "../../redux/actions/authAction";
import SidebarSecond from "../../components/SidebarSecond";
// import ResultPage from "./ResultPage";

function Quiz(){
    const dispatch = useDispatch();
    // const loggedInUserId = useSelector((state) => state.auth.user);
    const [answers, setAnswers] = useState({
        question1: null,
        question2: null,
        question3: null,
        question4: null,
        question5: null,
    })
    
    const [error, setError] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [mood, setMood] = useState('');
  

    const determineMood = (score) => {
        let resultMood = '';

        if (score >= 70 ) {
            resultMood = 'Good';
        } else if (score >= 50 ) {
            resultMood  = 'Normal';
        } else {
            resultMood  = 'Down';
        }
        return resultMood ;
    }

    const questions = [
      {
        id: 1, 
        question: "1. Konsentrasi & fokus menjalankan aktivitas rutin",
        options: [
            {option: "Mudah Fokus", value: 20},
            {option: "Cukup Fokus", value: 10},
            {option: "Kesulitan Fokus", value: 5},
        ]
     },

     {
        id: 2, 
        question: "2. Bisa rileks & cukup waktu tidur",
        options: [
            {option: "Selalu Bisa", value: 20},
            {option: "Cukup Bisa", value: 10},
            {option: "Sering Kesulitan", value: 5},
        ]
     },

     {
        id: 3, 
        question: "3. Merasa khawatir tanpa alasan yang jelas (mis. deg-degan, badan tegang, sulit bernapas)",
        options: [
            {option: "Tidak Pernah", value: 20},
            {option: "Jarang", value: 10},
            {option: "Sering", value: 5},
        ]
     },

     {
        id: 4, 
        question: "4. Mudah merasa kesal atau marah karena hal-hal sepele",
        options: [
            {option: "Tidak", value: 20},
            {option: "Jarang", value: 10},
            {option: "Sering", value: 5},
        ]
     },

     {
        id: 5, 
        question: "5. Isu dalam Hubungan Interpersonal",
        options: [
            {option: "Tidak Ada", value: 20},
            {option: "Tidak Terlalu Mengganggu", value: 10},
            {option: "Ada yang mengganggu", value: 5},
        ],
     },
  ];

  // useEffect(() => {
  //   const quizAnswers = async () => {
  //     try {
  //       const userId = localStorage.getItem("userId");
  //       if (userId) {
  //         const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/hasilquizzes/quiz`);
  //         const userData = response.data;
  //         setUserData(userData); 
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   userData();
  // }, []); 

  const handleAnswersSelection = (questionId, selectedValue) => {
    setAnswers({
        ...answers,
        [`question${questionId}`]: selectedValue,
    });
    if (!selectedValue) {
        setErrorMessage("Please enter email and password!")
            return;
    }
    console.log(selectedValue)
  };

  const handleSubmit = async () => {
    const unansweredQuestions = questions.filter(ques => answers[`question${ques.id}`] === null || answers[`question${ques.id}`] === undefined);

    if (unansweredQuestions.length > 0) {
      setError('Mohon isi semua pertanyaan sebelum melanjutkan.');
    } else {
    const score = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    const calculateMood = determineMood(score);

    setTotalScore(score);
    setMood(calculateMood);
    setShowResult(true);
   
    const user_id = localStorage.getItem("userId")
    // console.log(user_id)

    const userResults = {
        user_id: user_id,
        questions: questions.map(ques => `Question ${ques.id}`),
        answers: questions.map(ques => answers[`question${ques.id}`]),
        score: score,
        mood: calculateMood
    };
    dispatch(quizAnswers(user_id, JSON.stringify(userResults)));
    console.log("New quiz result:", userResults);
    // console.log(userId)
  }
}; 

  return (
    <div className="min-h-screen items-center justify-center p-3 bg-[#F2F7FF]">
        <div className="flex px-4">
       <SidebarSecond/>
      <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
        {showResult ? (
          <ResultPage totalScore={totalScore} mood={mood} />
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-4 text-[#435EBE]">Quiz InCare</h1>
          <div className="text-center">
            {error && <p style={{color: 'red'}}>{error}</p>}
          </div>
            <br />
            {questions.map((ques) => (
              <div key={ques.id} className="mb-6 ml-12">
                <h4 className="text-lg font-semibold mb-2">{ques.question}</h4> 
                <div className="ml-7">
                {ques.options.map((opt) => (
                  <div key={opt.option} className="flex items-center mb-2">
                    <label>
                      <input
                        type="radio"
                        name={`question${ques.id}`}
                        value={opt.value}
                        onChange={() => handleAnswersSelection(ques.id, opt.value)}
                        checked={answers[`question${ques.id}`] === opt.value}
                        className="mr-2"
                      />
                      {opt.option}
                    </label>
                  </div>
                ))}
              </div>
              </div>
            ))} <br />
            <div className="grid grid-cols-1">
                <button onClick={handleSubmit}
                className="bg-[#435EBE] text-white px-4 py-2 place-self-end rounded hover:bg-[#3d55ab]"
                >Submit</button>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
};


export default Quiz;