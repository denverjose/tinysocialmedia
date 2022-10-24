import React, { Fragment, useState, useEffect } from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import LoginForm from "../components/Auth/LoginForm";
import useHttp from "../hooks/use-http";
import { addUser, authLogin } from "../lib/api";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isEntering, setIsEntering] = useState(false);
  const { sendRequest: requestRegister, status } = useHttp(addUser);
  const { sendRequest: requestLogin, status:loginStatus} = useHttp(authLogin);

  useEffect(() => {
    if (status === "completed") {
      setIsLogin(true);
    }
  }, [status]);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const registerHandler = (quoteData) => {
    requestRegister(quoteData);
  };
  const loginHandler = (requestData) => {
    requestLogin(requestData);
  };

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  return (
    <Fragment>
      {isLogin && (
        <LoginForm
          login={loginHandler}
          switchAuthModeHandler={switchAuthModeHandler}
          isLoading={loginStatus === "pending"}
          isLogin={isLogin}
          isEntering={isEntering}
          formFocusedHandler={formFocusedHandler}
          finishEnteringHandler={finishEnteringHandler}
        />
      )}
      {!isLogin && (
        <RegisterForm
          register={registerHandler}
          switchAuthModeHandler={switchAuthModeHandler}
          isLoading={status === "pending"}
          isLogin={isLogin}
          isEntering={isEntering}
          formFocusedHandler={formFocusedHandler}
          finishEnteringHandler={finishEnteringHandler}
        />
      )}
    </Fragment>
  );
};

export default LoginPage;
