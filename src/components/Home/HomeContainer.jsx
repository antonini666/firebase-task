import React, { useState, useEffect } from "react";
import Home from "./Home";
import { withFirebase } from "../Firebase";

const HomeContainer = ({ firebase }) => {
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

  return <Home items={items} loading={loading} onRemoveItem={onRemoveItem} />;
};

export default withFirebase(HomeContainer);
