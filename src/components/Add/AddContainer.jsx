import React, { useState, useEffect } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import dateformat from "dateformat";
import { Redirect } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { setItem } from "../../store/item/actions";
import Add from "./Add";

const initialErrorState = {
  title: "",
  description: "",
  price: "",
  image: "",
};

const AddContainer = ({ firebase, authUser, item, setItem, location }) => {
  const [fieldErrors, setFieldErrors] = useState(initialErrorState);
  const [date, setDate] = useState(
    dateformat(new Date(), "yyyy-mm-dd'T'HH:MM")
  );

  useEffect(() => {
    const timer = setInterval(() =>
      setDate(dateformat(new Date(), "yyyy-mm-dd'T'HH:MM"))
    );
    return () => clearInterval(timer);
  });

  const handleChange = (event) => {
    switch (event.target.name) {
      case "title":
        const title = event.target.value.trim();
        setItem({ ...item, title: title });
        if (title.length >= 20 && title.length <= 60) {
          setFieldErrors({
            ...fieldErrors,
            title: "",
          });
        } else {
          setFieldErrors({
            ...fieldErrors,
            title: "Required field, minimum 20, maximum 60 characters",
          });
        }
        break;
      case "description":
        const description = event.target.value.replace(/\s+/g, " ").trim();
        setItem({ ...item, description: description });
        if (description.length <= 200) {
          setFieldErrors({
            ...fieldErrors,
            description: "",
          });
        } else {
          setFieldErrors({
            ...fieldErrors,
            description: "Maximum 200 characters",
          });
        }
        break;
      case "price":
        setItem({ ...item, price: event.target.value });
        break;
      case "discount":
        setItem({ ...item, discount: event.target.value });
        break;
      case "discountDate":
        setItem({ ...item, discountDate: event.target.value });
        break;
      case "image":
        const file = event.target.files[0];

        if (file) {
          setFieldErrors({ ...fieldErrors, image: "Select image" });
          const fileUrl = `${file.name.split(".")[0]}${Date.now()}.${
            file.name.split(".")[1]
          }`;

          const uploadTask = firebase.uploadImage(fileUrl).put(file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => error,
            () => {
              firebase
                .downloadImage("images")
                .child(fileUrl)
                .getDownloadURL()
                .then((url) => {
                  setItem({ ...item, image: url });
                  setFieldErrors({ ...fieldErrors, image: "" });
                });
            }
          );
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    firebase.items().push({
      ...item,
      createdAt: firebase.serverValue.TIMESTAMP,
    });
  };

  const errorClass = (error) => {
    return error.length === 0 ? "" : "is-invalid";
  };

  const errorCount = (errors) => {
    return Object.values(errors).every((error) => error.length === 0);
  };

  if (!authUser) {
    return <Redirect to={ROUTES.SIGN_IN} />;
  }

  return (
    <Add
      item={item}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      errorClass={errorClass}
      fieldErrors={fieldErrors}
      date={date}
      errorCount={errorCount}
    />
  );
};

const mapStateToProps = (state) => ({
  authUser: state.auth.authUser,
  item: state.item.item,
});

const mapDispatchToProps = {
  setItem,
};

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(AddContainer);
