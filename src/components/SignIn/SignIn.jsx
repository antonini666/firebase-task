import React, { useState } from "react";
import { compose } from "recompose";

import { Link, Redirect } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import "./SignIn.scss";
import { connect } from "react-redux";

const SignInPage = ({ authUser }) => {
  return (
    <div className="container">
      <h1 className="login-title text-center text-dark">
        Log in with your email account
      </h1>
      <SignInForm />
      <SignUpLink />
    </div>
  );
};

const SignUpLink = () => (
  <p className="col-md-6 mx-auto text-right pt-2">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const INITIAL_STATE = {
  email: "",
  password: "",
};

const SignInFormBase = ({ firebase, authUser }) => {
  const [userData, setUserData] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);

  const { email, password } = userData;

  const onSubmit = (e) => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setUserData(INITIAL_STATE);
        setError(null);
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

  if (authUser) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto col-md-6">
      <div className="form-group mb-3">
        <input
          name="email"
          value={email}
          onChange={onChange}
          type="text"
          placeholder="Email Address"
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <input
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          placeholder="Password"
          className="form-control"
        />
      </div>

      <button
        disabled={isInvalid}
        type="submit"
        className="btn btn-dark btn-block"
      >
        Sign In
      </button>

      {error && <p className="text-danger pt-2">{error.message}</p>}
    </form>
  );
};

const mapStateToProps = (state) => ({
  authUser: state.auth.authUser,
});

const SignInForm = compose(
  withFirebase,
  connect(mapStateToProps)
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
