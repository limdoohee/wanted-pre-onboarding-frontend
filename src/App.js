import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import SignIn from "./Login/SignIn";
import Todo from "./Todo/Todo";
import { API } from "./config.js";
import SignUp from "./Login/SignUp";
import "./config.css";
import "./common.css";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("token");

    storedUserLoggedInInformation ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  const loginHandler = (email, password) => {
    fetch(API.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.access_token) {
          setIsLoggedIn(true);
          localStorage.setItem("token", res.access_token);
          navigate("/todo");
        } else {
          alert("로그인 실패");
        }
      });
  };

  return (
    <Routes>
      <Route>
        <Route
          path="/"
          element={isLoggedIn ? <Todo /> : <SignIn onLogin={loginHandler} />}
        />
        <Route
          path="/todo"
          element={isLoggedIn ? <Todo /> : <Navigate to="/" />}
        />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/Login" element={<SignIn onLogin={loginHandler} />} />
    </Routes>
  );
}

export default App;
