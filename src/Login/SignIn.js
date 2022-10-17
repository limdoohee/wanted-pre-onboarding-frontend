import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";

const SignIn = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

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
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <form onSubmit={submitHandler} className="wrapper">
      <ul className="listWrapper">
        <li>
          <label htmlFor="email" className="cmm-label">
            E-Mail
          </label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            className="cmm-input"
          />
        </li>
        <li>
          <label htmlFor="password" className="cmm-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            className="cmm-input"
          />
        </li>
      </ul>
      <div>
        <Link to="/signup" className="cmm-btn">
          회원가입
        </Link>
        <button type="submit" disabled={!formIsValid} className="cmm-btn">
          로그인
        </button>
      </div>
    </form>
  );
};

export default SignIn;
