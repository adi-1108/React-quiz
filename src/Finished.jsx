import React from "react";

const Finished = ({ points,dispatch }) => {
  return (
    <>
      <h4 className="flex justify-center items-center font-bold text-5xl">
        You have complete the Quiz
      </h4>
      <p className="flex justify-center items-center font-bold text-3xl">
        Your total score was {points}
      </p>

      <button
        onClick={() => {
          dispatch({ type: "restartQuiz" });
        }}
        className="btn btn-ui"
      >
        Restart
      </button>
    </>
  );
};

export default Finished;
