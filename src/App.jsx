import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Content from "./Content";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
};

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
      };
    case "next":
      return {
        ...state,
      };

    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
      };
    default:
      throw new Error("Action unknown");
  }
};

const App = () => {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const NumQuestions = questions.length;
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
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} NumQuestions={NumQuestions} />
        )}
        {status === "active" && (
          <Question
            dispatch={dispatch}
            answer={answer}
            index={index}
            questions={questions}
          />
        )}
      </Content>
    </div>
  );
};

export default App;
