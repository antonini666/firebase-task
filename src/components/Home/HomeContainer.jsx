import React, { useState, useEffect } from "react";
import Home from "./Home";
import { withFirebase } from "../Firebase";

const HomeContainer = ({ firebase }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  // const [text, setText] = useState("");

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

  // const onChangeText = (event) => {
  //   setText(event.target.value);
  // };

  // const onCreateItems = (event) => {
  //   if (text.trim().length > 0)
  //     firebase.items().push({
  //       text,
  //       createdAt: firebase.serverValue.TIMESTAMP,
  //     });

  //   setText("");

  //   event.preventDefault();
  // };

  

  // const onEditMessage = (item, text) => {
  //   const { uid, ...itemSnapshot } = item;

  //   firebase.item(item.uid).set({
  //     ...itemSnapshot,
  //     text,
  //     editedAt: firebase.serverValue.TIMESTAMP,
  //   });
  // };

  return <Home items={items} loading={loading} onRemoveItem={onRemoveItem}/>;
};

export default withFirebase(HomeContainer);
