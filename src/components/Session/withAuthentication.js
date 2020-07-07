import React, { useEffect } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { setAuthUser } from "../../store/auth/actions";
import { withFirebase } from "../Firebase";

const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    props.setAuthUser(JSON.parse(localStorage.getItem("authUser")));

    useEffect(() => {
      const listener = props.firebase.auth.onAuthStateChanged(
        (authUser) => {
          localStorage.setItem("authUser", JSON.stringify(authUser));
          props.setAuthUser(authUser);
        },
        () => {
          localStorage.removeItem("authUser");
          props.setAuthUser(null);
        }
      );
      return listener;
    }, [props]);
    return <Component {...props} />;
  };

  const mapDispatchToProps = {
    setAuthUser,
  };

  return compose(
    withFirebase,
    connect(null, mapDispatchToProps)
  )(WithAuthentication);
};

export default withAuthentication;
