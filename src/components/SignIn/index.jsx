import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
  <div className="container">
    <h1 className="text-right text-info mt-2">SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
};

const SignInFormBase = ({ firebase, history }) => {
  const [userData, setUserData] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);

  const { email, password } = userData;

  const onSubmit = (e) => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setUserData(INITIAL_STATE);
        setError(null);
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setError(error);
      });

    e.preventDefault();
  };

  const isInvalid = password === "" || email === "";

  const onChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto col-md-6">
      <div className="form-group pb-3">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          value={email}
          onChange={onChange}
          type="text"
          id="email"
          placeholder="Email Address"
          className="form-control"
        />
      </div>
      <div className="form-group pb-3">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          id="password"
          placeholder="Password"
          className="form-control"
        />
      </div>

      <button disabled={isInvalid} type="submit" className="btn btn-info">
        Sign In
      </button>

      {error && <p className="text-danger pt-2">{error.message}</p>}
    </form>
  );
};

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
