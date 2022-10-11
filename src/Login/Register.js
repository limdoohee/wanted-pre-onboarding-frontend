import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 7,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 7,
    };
  }
  return { value: "", isValid: false };
};
const Register = () => {
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // 객체 디스트럭처링을 통해 객체의 값이 변경될 경우에만 버튼활성화 체크
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 100);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(emailState.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(emailState.value.includes("@") && passwordState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    registerHandler(emailState.value, passwordState.value);
  };

  const registerHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");

    fetch("https://pre-onboarding-selection-task.shop/auth/signup", {
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
        res.access_token ? navigate("/") : alert(res.message);
      });
  };

  return (
    <form onSubmit={submitHandler}>
      <div
        className={`${classes.control} ${
          emailState.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
      </div>
      <div
        className={`${classes.control} ${
          passwordState.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
      </div>
      <div className={classes.actions}>
        <button type="submit" className={classes.btn} disabled={!formIsValid}>
          회원가입
        </button>
      </div>
    </form>
  );
};

export default Register;
