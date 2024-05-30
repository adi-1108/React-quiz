import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const Options = ({ questions, index, dispatch, answer }) => {
  console.log("Correct Option", questions[index].correctOption);
  console.log("Chossen option", answer);

  return (
    <div>
      <div className="options">
        {questions[index].options.map((el, _in) => (
          <button
            onClick={() => {
              dispatch({ type: "newAnswer", payload: _in });
            }}
            className={clsx(
              "py-8 font-bold rounded-full bg-yellow-800  hover:bg-yellow-700 w-full",
              {
                "ml-8": _in === answer,
                "bg-green-500": answer !== null && answer === questions[index].correctOption,
              }
            )}
            disabled={answer !== null}
            key={el}
          >
            {el} {_in}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Options;
