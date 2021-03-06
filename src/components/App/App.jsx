import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing/Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn/SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AddItemPage from "../AddItem/";
import EditItemPage from "../EditItem";
import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

import "./App.scss";

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <div className="bg-dark bg-shadow">
          <Navigation />
        </div>

        <div className="container">
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ADD} component={AddItemPage} />
          <Route path={ROUTES.EDIT} component={EditItemPage} />
        </div>
      </React.Fragment>
    </Router>
  );
};

export default withAuthentication(App);
