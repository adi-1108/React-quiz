import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Content from "./Content";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import Finished from "./Finished";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};
const SECS_PER_QUESTION = 10;
const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "next":
      return {
        ...state,
      };

    case "newAnswer":
      const CurrQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === CurrQuestion.correctOption
            ? state.points + CurrQuestion.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        status: "active",
      };
    case "quizEnd":
      return {
        ...state,
        status: "finished",
        answer: null,
        index: 0,
      };

    case "restartQuiz":
      return {
        ...state,
        status: "ready",
        answer: null,
        points: 0,
        index: 0,
        secondsRemaining: 60,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
};

const App = () => {
  const [
    { questions, status, index, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const NumQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, curr) => acc + curr.points,
    0
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/questions");

        if (!response.ok) {
          throw new Error("Fetch Failed");
        }
        const data = await response.json();
        dispatch({ type: "dataRecieved", payload: data });
        console.log(data);
      } catch (error) {
        dispatch({ type: "dataFailed", payload: null });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />

      <Content>
        <>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen dispatch={dispatch} NumQuestions={NumQuestions} />
          )}
          {status === "active" && (
            <>
              <Progress
                index={index}
                points={points}
                numQuestion={NumQuestions}
                maxPossiblePoints={maxPossiblePoints}
              />
              <Question
                dispatch={dispatch}
                answer={answer}
                points={points}
                questions={questions[index]}
                numQuestion={NumQuestions}
                index={index}
                secondsRemaining={secondsRemaining}
              />
            </>
          )}
          {status === "finished" && (
            <Finished points={points} dispatch={dispatch} />
          )}
        </>
      </Content>
    </div>
  );
};

export default App;
