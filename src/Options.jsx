import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const Options = ({ questions, dispatch, answer }) => {
  console.log("Correct Option", questions.correctOption);
  console.log("Chossen option", answer);

  return (
    <div>
      
      <div className="options">
        {questions.options.map((el, _in) => (
          <button
            onClick={() => {
              dispatch({ type: "newAnswer", payload: _in });
            }}
            className={`btn btn-option ${_in === answer ? "answer" : ""} ${
              answer !== null
                ? _in === questions.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            disabled={answer !== null}
            key={el}
          >
            {el}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Options;
