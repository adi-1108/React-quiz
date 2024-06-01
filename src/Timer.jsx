import React, { useEffect } from "react";

const Timer = ({ secondsRemaining, dispatch }) => {
  const mins = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="timer">
      {mins < 10 && "0"}{mins} : {sec < 10 && "10"} {sec}
    </div>
  );
};

export default Timer;
