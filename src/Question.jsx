import React from "react";
import Options from "./Options";
import Timer from "./Timer";

const Question = ({
  questions,
  dispatch,
  answer,
  points,
  numQuestion,
  index,
  secondsRemaining,
}) => {
  //   console.log("Questions obj", questions);

  return (
    <div>
      <h4>{questions.question}</h4>

      <Options answer={answer} dispatch={dispatch} questions={questions} />

      {index === numQuestion - 1 ? (
        <button
          className="btn btn-ui"
          onClick={() => {
            dispatch({ type: "quizEnd" });
          }}
        >
          Finish
        </button>
      ) : (
        <button
          onClick={() => {
            dispatch({ type: "nextQuestion" });
          }}
          className="btn btn-ui"
        >
          Next
        </button>
      )}

      <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
    </div>
  );
};

export default Question;
