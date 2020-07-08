import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";

import Home from "./Home";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { setListItems } from "../../store/listItems/actions";

const HomeContainer = ({ firebase, authUser, setListItems, list }) => {
  const [loading, setLoading] = useState(true);

  console.log(list);

  useEffect(() => {
    firebase.items().on("value", (snapshot) => {
      const itemObject = snapshot.val();

      if (itemObject) {
        const itemList = Object.keys(itemObject).map((key) => ({
          ...itemObject[key],
          uid: key,
        }));

        console.log(itemList);

        setListItems(itemList);
        setLoading(false);
      } else {
        setListItems(null);
        setLoading(false);
      }
    });
    return () => {
      firebase.items().off();
    };
  }, [firebase, setListItems]);

  const onRemoveItem = (uid) => {
    firebase.item(uid).remove();
  };

  if (!authUser) {
    return <Redirect to={ROUTES.SIGN_IN} />;
  }

  return <Home items={list} loading={loading} onRemoveItem={onRemoveItem} />;
};

const mapStateToProps = (state) => ({
  authUser: state.auth.authUser,
  list: state.list.list,
});

const mapDispatchToProps = {
  setListItems,
};

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(HomeContainer);
