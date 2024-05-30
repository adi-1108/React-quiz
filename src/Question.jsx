import React from "react";
import Options from "./Options";

const Question = ({ questions, index, dispatch, answer }) => {
  //   console.log("Questions obj", questions);
  return (
    <div>
      <h4>{questions[index].question}</h4>

      <Options answer= {answer} dispatch={dispatch} questions={questions} index={index} />

      <button onClick={() => {}} className="btn btn-ui">
        Next
      </button>
    </div>
  );
};

export default Question;
