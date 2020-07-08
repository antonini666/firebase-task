import React from "react";

import './SignUp.scss'

const SignUpPage = ({
  username,
  email,
  passwordOne,
  passwordTwo,
  onChange,
  onSubmit,
  error,
  errors,
  errorCount,
  validateInput,
  formValid,
}) => {
  return (
    <div className="container">
      <h1 className="registration-title text-center text-dark">Create your account</h1>
      <form onSubmit={onSubmit} className="mx-auto col-md-6">
        <div className="form-group mb-3">
          <input
            name="username"
            value={username}
            onChange={onChange}
            type="text"
            placeholder="Full Name"
            className={`form-control ${validateInput(
              errorCount.username,
              errors.username
            )}`}
          />
          <div className="invalid-feedback">
            Full Name must be 5 characters long!
          </div>
        </div>
        <div className="form-group mb-3">
          <input
            name="email"
            value={email}
            onChange={onChange}
            type="text"
            placeholder="Email Address"
            className={`form-control ${validateInput(
              errorCount.email,
              errors.email
            )}`}
          />
          <div className="invalid-feedback">Email is not valid!</div>
        </div>

        <div className="form-group mb-3">
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={onChange}
            type="password"
            placeholder="Password"
            className={`form-control ${validateInput(
              errorCount.passwordOne,
              errors.passwordOne
            )}`}
          />
          <div className="invalid-feedback">
            Password must be 8 characters long!
          </div>
        </div>

        <div className="form-group mb-3">
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={onChange}
            type="password"
            placeholder="Confirm Password"
            className={`form-control ${validateInput(
              errorCount.passwordTwo,
              errors.passwordTwo
            )}`}
          />
          <div className="invalid-feedback">Passwords do not match</div>
        </div>

        {error && <p className="text-danger">{error.message}</p>}

        <button
          type="submit"
          disabled={formValid ? false : true}
          className="btn btn-dark btn-block"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
