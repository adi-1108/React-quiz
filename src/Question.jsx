import React from "react";
import Options from "./Options";

const Question = ({ questions, dispatch, answer, points }) => {
  //   console.log("Questions obj", questions);

  return (
    <div>
      <h4>{questions.question}</h4>

      <Options answer={answer} dispatch={dispatch} questions={questions} />

      <button
        onClick={() => {
          dispatch({ type: "nextQuestion" });
        }}
        className="btn btn-ui"
      >
        Next
      </button>
    </div>
  );
};

export default Question;
