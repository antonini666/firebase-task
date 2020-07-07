import React, { useState, useEffect } from "react";

import Home from "./Home";
import { withFirebase } from "../Firebase";
import { Redirect } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { compose } from "recompose";
import { connect } from "react-redux";

const HomeContainer = ({ firebase, authUser }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    firebase.items().on("value", (snapshot) => {
      const itemObject = snapshot.val();

      if (itemObject) {
        const itemList = Object.keys(itemObject).map((key) => ({
          ...itemObject[key],
          uid: key,
        }));
        setItems(itemList);
        setLoading(false);
      } else {
        setItems(null);
        setLoading(false);
      }
    });
    return () => {
      firebase.items().off();
    };
  }, [firebase]);

  const onRemoveItem = (uid) => {
    firebase.item(uid).remove();
  };

  if (!authUser) {
    return <Redirect to={ROUTES.SIGN_IN} />;
  }

  return <Home items={items} loading={loading} onRemoveItem={onRemoveItem} />;
};

const mapStateToProps = (state) => ({
  authUser: state.auth.authUser,
});

export default compose(withFirebase, connect(mapStateToProps))(HomeContainer);
