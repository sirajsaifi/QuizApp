import React, { useState, useEffect } from "react";
import axios from "axios";
import { Options } from "./Options";
import toast from "react-hot-toast";

export const Cards = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  // const [userId, setUserId] = useState(''); // Assuming you have a way to get the user ID

  useEffect(() => {
    // Fetch questions from the server
    const fetchQuestions = async () => {
      const response = await axios.get(
        "/api/v1/question",
        JSON.stringify({ userName, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setQuestions(response.data);
    };
    fetchQuestions();
  }, []);

  const handleSubmit = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Submit the score to the server
      axios.post(
        "/api/v1/score",
        { score },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Answer submitted successfully");
    }
  };

  const handleOptionChange = (correct) => {
    if (correct) {
      setScore(score + 1);
    }
  };

  // if (questions.length === 0) {
  //   return <div>Loading...</div>;
  // }

  // const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="card bg-base-100 w-80 shadow-xl m-10">
      <div className="card-body">
        <h2 className="card-title">
          {questions[currentQuestionIndex].question}
        </h2>
        <Options
          options={currentQuestion.options}
          correctAnswer={currentQuestion.correctAnswer}
          onOptionChange={handleOptionChange}
        />
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
