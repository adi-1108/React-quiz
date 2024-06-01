import React, { useEffect, useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  activeLoan: false,
  user: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        balance: 500,
        loan: 0,
        user: true,
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + 150,
      };
    case "withdraw":
      return {
        ...state,
        balance:
          state.balance > 150
            ? state.balance - 150
            : state.balance - state.balance,
      };

    case "loanRequest":
      return {
        ...state,
        balance: state.balance + 5000,
        loan: state.loan + 5000,
        activeLoan: true,
      };

    case "payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        activeLoan: false,
      };
    case "closeAcc":
      return {
        ...initialState,
      };
    default:
      break;
  }
};

const BankApp = () => {
  const [{ balance, loan, user, activeLoan }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>useReducer bank Account</h1>
      <p className="font-bold text-5xl mb-4">balance : {balance} </p>
      <p className="font-bold text-5xl mb-10">Loan : {loan}</p>
      <button
        className="btn m-3 btn-ui"
        onClick={() => {
          dispatch({ type: "openAccount" });
        }}
        disabled={user === true}
      >
        open account
      </button>
      <button
        onClick={() => {
          dispatch({ type: "deposit" });
        }}
        disabled={user === false}
        className="btn m-3 btn-ui"
      >
        desposite 150
      </button>
      <button
        onClick={() => {
          dispatch({ type: "withdraw" });
        }}
        disabled={user === false}
        className="btn m-3 btn-ui"
      >
        Withdraw 150
      </button>
      <button
        onClick={() => {
          dispatch({ type: "loanRequest" });
        }}
        disabled={user === false || activeLoan}
        className="btn m-3 btn-ui"
      >
        Request loan of 5000
      </button>
      <button
        onClick={() => {
          dispatch({ type: "payLoan" });
        }}
        disabled={user === false}
        className="btn m-3 btn-ui"
      >
        Pay Loan
      </button>
      <button
        onClick={() => {
          balance === 0
            ? dispatch({ type: "closeAcc" })
            : alert("First withdraw all the money");
        }}
        disabled={user === false}
        className="btn m-3 btn-ui"
      >
        Close Account
      </button>
    </div>
  );
};

export default BankApp;
