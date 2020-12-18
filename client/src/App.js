import logo from "./logo.svg";
import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
import Routes from "./Routes";
import { AuthContext } from "./context/auth";
import Header from "./components/Header";

const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userName: "000user" }),
};

const App = (props) => {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));

  let tokensValue = existingTokens;
  if (existingTokens == null || existingTokens == undefined) {
    tokensValue = { messsage: null, id: null, status: false };
  }
  const [authTokens, setAuthTokens] = useState(tokensValue);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Routes></Routes>
    </AuthContext.Provider>
  );
};

export default App;
