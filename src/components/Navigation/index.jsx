import React, { useContext } from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";

const Navigation = () => {
  const authUser = useContext(AuthUserContext);

  return (
    <div className="container">
      <div className="d-flex justify-content-between pb-3 pt-3">
        {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
      </div>
    </div>
  );
};

const NavigationAuth = () => {
  return (
    <React.Fragment>
      <ul className="nav">
        <li className="nav-item ">
          <Link to={ROUTES.LANDING} className="nav-link text-white">
            Landing
          </Link>
        </li>
        <li className="nav-item">
          <Link to={ROUTES.HOME} className="nav-link text-white">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to={ROUTES.ACCOUNT} className="nav-link text-white">
            Account
          </Link>
        </li>
      </ul>
      <ul className="nav">
        <li>
          <SignOutButton />
        </li>
      </ul>
    </React.Fragment>
  );
};

const NavigationNonAuth = () => (
  <React.Fragment>
    <ul className="nav">
      <li className="nav-item">
        <Link to={ROUTES.LANDING} className="nav-link text-white">
          Landing
        </Link>
      </li>
    </ul>
    <ul className="nav">
      <li className="nav-item">
        <Link to={ROUTES.SIGN_IN} className="btn btn-outline-light">
          Sign In
        </Link>
      </li>
    </ul>
  </React.Fragment>
);

export default Navigation;
