import React, { useContext } from "react";

const FirebaseContext = React.createContext(null);

export const withFirebase = (Component) => {
  const WithFirebase = (props) => {
    const firebase = useContext(FirebaseContext);
    return <Component {...props} firebase={firebase} />;
  };
  return WithFirebase;
};

export default FirebaseContext;
