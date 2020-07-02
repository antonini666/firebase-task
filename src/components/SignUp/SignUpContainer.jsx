import React, { useState, useEffect } from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

import SignUpPage from "./SignUp";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
};

const INITIAL_ERROR_STATE = {
  username: false,
  email: false,
  passwordOne: false,
  passwordTwo: false,
};

const newLocal = /[\w-]+@([\w-]+\.)+[\w-]+/;

const validEmailRegex = RegExp(newLocal);

const SignUpContainer = ({ firebase, history }) => {
  const [userData, setUserData] = useState(INITIAL_STATE);
  const [formValid, setFormValid] = useState(false);
  const [errorCount, setErrorCount] = useState(INITIAL_ERROR_STATE);
  const [errors, setErrors] = useState(INITIAL_ERROR_STATE);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (Object.values(errors).includes(false)) {
      return setFormValid(false);
    } else {
      return setFormValid(true);
    }
  }, [errors]);

  const { username, email, passwordOne, passwordTwo } = userData;

  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "username":
        setErrorCount({ ...errorCount, username: true });
        setErrors({ ...errors, username: value.length < 5 ? false : true });
        break;
      case "email":
        setErrorCount({ ...errorCount, email: true });
        setErrors({
          ...errors,
          email: validEmailRegex.test(value) ? true : false,
        });
        break;
      case "passwordOne":
        setErrorCount({ ...errorCount, passwordOne: true });
        setErrors({
          ...errors,
          passwordOne: value.length < 8 ? false : true,
        });
        break;
      case "passwordTwo":
        setErrorCount({ ...errorCount, passwordTwo: true });
        setErrors({
          ...errors,
          passwordTwo: value !== userData.passwordOne ? false : true,
        });
        break;
      default:
        break;
    }

    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        return firebase.user(authUser.user.uid).set({
          username,
          email,
        });
      })
      .then(() => {
        setUserData(INITIAL_STATE);
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const validateInput = (errorCount, errors) => {
    if (errorCount) {
      if (errors) {
        return "is-valid";
      } else {
        return "is-invalid";
      }
    } else {
      return "";
    }
  };

  return (
    <SignUpPage
      username={username}
      email={email}
      passwordOne={passwordOne}
      passwordTwo={passwordTwo}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      errors={errors}
      errorCount={errorCount}
      validateInput={validateInput}
      formValid={formValid}
    />
  );
};

export default compose(withRouter, withFirebase)(SignUpContainer);
