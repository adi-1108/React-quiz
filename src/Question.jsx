import React from "react";
import Options from "./Options";

const Question = ({ questions, dispatch, answer }) => {
  //   console.log("Questions obj", questions);
  return (
    <div>
      <h4>{questions.question}</h4>

      <Options
        answer={answer}
        dispatch={dispatch}
        questions={questions}
      />

      <button onClick={() => {}} className="btn btn-ui">
        Next
      </button>
    </div>
  );
};

export default Question;
