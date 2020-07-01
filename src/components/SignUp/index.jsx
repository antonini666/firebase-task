import React, { useState, useEffect } from "react";

import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignUpPage = () => {
  return (
    <div className="container">
      <h1 className="text-right text-info mt-2">Sign Up</h1>
      <SignUpForm />
    </div>
  );
};

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

const SignUpFormBase = ({ firebase, history }) => {
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
    <form onSubmit={onSubmit} className="mx-auto col-md-6">
      <div className="form-group">
        <label htmlFor="username">User Name</label>
        <input
          name="username"
          value={username}
          onChange={onChange}
          type="text"
          placeholder="Full Name"
          id="username"
          className={`form-control ${validateInput(
            errorCount.username,
            errors.username
          )}`}
        />
        <div className="invalid-feedback">
          Full Name must be 5 characters long!
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          name="email"
          value={email}
          onChange={onChange}
          type="text"
          placeholder="Email Address"
          id="email"
          className={`form-control ${validateInput(
            errorCount.email,
            errors.email
          )}`}
        />
        <div className="invalid-feedback">Email is not valid!</div>
      </div>

      <div className="form-group">
        <label htmlFor="passwordOne">Password</label>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={onChange}
          type="password"
          placeholder="Password"
          id="passwordOne"
          className={`form-control ${validateInput(
            errorCount.passwordOne,
            errors.passwordOne
          )}`}
        />
        <div className="invalid-feedback">
          Password must be 8 characters long!
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="passwordTwo">Confirm Password</label>
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={onChange}
          type="password"
          placeholder="Confirm Password"
          id="passwordTwo"
          className={`form-control ${validateInput(
            errorCount.passwordTwo,
            errors.passwordTwo
          )}`}
        />
        <div className="invalid-feedback">Passwords do not match</div>
      </div>

      {error && <p className="text-danger pt-2">{error.message}</p>}

      <button
        type="submit"
        disabled={formValid ? false : true}
        className="btn btn-info"
      >
        Sign Up
      </button>
    </form>
  );
};

const SignUpLink = () => (
  <p className="col-md-6 mx-auto text-right ">
    Don't have an account?{" "}
    <Link to={ROUTES.SIGN_UP} className="text-info">
      Sign Up
    </Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
