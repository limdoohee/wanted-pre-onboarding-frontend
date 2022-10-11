import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Todo from "./Todo/Todo";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("token");

    storedUserLoggedInInformation ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  const loginHandler = (email, password) => {
    fetch("https://pre-onboarding-selection-task.shop/auth/signin", {
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
          element={isLoggedIn ? <Todo /> : <Login onLogin={loginHandler} />}
        />
        <Route
          path="/todo"
          element={isLoggedIn ? <Todo /> : <Navigate to="/" />}
        />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/Login" element={<Login onLogin={loginHandler} />} />
    </Routes>
  );
}

export default App;
