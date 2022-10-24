import { useRef, useContext, Fragment } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Prompt } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./LoginForm.module.css";

const LoginForm = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const loginHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredpassword = passwordInputRef.current.value;

    props.login({
      email: enteredEmail,
      password: enteredpassword,
      method: authCtx.login,
    });
  };

  return (
    <section className={classes.auth}>
      {!props.isLoading && (
        <Fragment>
          <Prompt
            when={props.isEntering}
            message={(location) =>
              "Are you sure you want to leave? All your entered data will be lost!"
            }
          />
          <h1>Login</h1>
          <form onSubmit={loginHandler} onFocus={props.formFocusedHandler}>
            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                autoComplete="off"
                id="email"
                ref={emailInputRef}
                required
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                id="password"
                ref={passwordInputRef}
                required
                autoComplete="off"
              />
            </div>
            <div className={classes.actions}>
              <button onClick={props.finishEnteringHandler}>Log in</button>
              <button
                type="button"
                className={classes.toggle}
                onClick={props.switchAuthModeHandler}
              >
                Don't have an account? Sign up here!
              </button>
            </div>
          </form>
        </Fragment>
      )}
      {props.isLoading && <LoadingSpinner />}
    </section>
  );
};

export default LoginForm;
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { useState } from 'react';
// import Modal from '@mui/material/Modal';

// const [open,setOpen] = useState(false);
// const handle = () => {
//   setOpen((prevState) => !prevState);
// };
