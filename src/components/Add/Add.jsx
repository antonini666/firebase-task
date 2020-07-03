import React, { useState } from "react";

import { withFirebase } from "../Firebase";
import dateformat from "dateformat";

const now = new Date();
const date = dateformat(now, "yyyy-mm-dd'T'HH:MM");

const INITIAL_STATE = {
  title: "",
  description: "",
  price: "",
  discount: "",
  discountDate: null,
  image: "",
};

const Add = ({ firebase }) => {
  const [loadImage, setLoadImage] = useState(false);
  const [itemData, setItemData] = useState(INITIAL_STATE);
  const [imageSize, setImageSize] = useState(false);

  const onChange = (event) => {
    switch (event.target.name) {
      case "title":
        setItemData({ ...itemData, title: event.target.value });
        break;
      case "description":
        setItemData({ ...itemData, description: event.target.value });
        break;
      case "price":
        setItemData({ ...itemData, price: event.target.value });
        break;
      case "discount":
        setItemData({ ...itemData, discount: event.target.value });
        break;
      case "discountDate":
        setItemData({ ...itemData, discountDate: event.target.value });
        break;
      case "image":
        const file = event.target.files[0];

        if (file) {
          const fileUrl = `${file.name.split(".")[0]}${Date.now()}.${
            file.name.split(".")[1]
          }`;

          const uploadTask = firebase.uploadImage(fileUrl).put(file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              let progress = snapshot.bytesTransferred === snapshot.totalBytes;
              setLoadImage(progress);
            },
            (error) => console.log(error),
            () => {
              firebase
                .downloadImage("images")
                .child(fileUrl)
                .getDownloadURL()
                .then((url) => {
                  setItemData({ ...itemData, image: url });
                });
            }
          );
        }

        break;
      default:
        break;
    }
  };

  const onSubmit = () => {
    firebase.items().push({
      ...itemData,
      createdAt: firebase.serverValue.TIMESTAMP,
    });
  };

  return (
    <div>
      <h2 className="text-success pt-2">Add</h2>
      <form onSubmit={onSubmit} className="mx-auto">
        <div className="mb-2">
          <label htmlFor="title" className="form-label">
            Product Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Iphone 11 Pro Max"
            onChange={onChange}
            minLength="20"
            maxLength="60"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description" className="form-label">
            Product Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            placeholder="Cool device"
            onChange={onChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            placeholder="999.99$"
            min="0.01"
            max="99999999.99"
            step="0.01"
            autoComplete="off"
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="discount" className="form-label">
            Discount
          </label>
          <input
            type="number"
            className="form-control"
            id="discount"
            name="discount"
            placeholder="10$"
            min="10"
            max="90"
            step="1"
            autoComplete="off"
            onChange={onChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="discountDate" className="form-label">
            Discount time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="discountDate"
            name="discountDate"
            min={date}
            onChange={onChange}
          />
        </div>
        <div className="form-file">
          <label htmlFor="file" className="form-label">
            Image
          </label>
          <input
            type="file"
            className={`form-control ${imageSize ? `is-valid` : `is-invalid`}`}
            id="file"
            name="image"
            accept="image/*"
            required
            onChange={onChange}
          />
          <div className="invalid-feedback">
            Image must be minimum width / height = 200px, maximum 4000px
          </div>
          {itemData.image ? (
            <img
              src={itemData.image}
              alt="upload_image"
              height="100px"
              className="m-2"
            />
          ) : null}
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Add item
        </button>
      </form>
    </div>
  );
};

export default withFirebase(Add);
