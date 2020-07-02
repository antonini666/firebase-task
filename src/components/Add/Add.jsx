import React, { useState } from "react";

import { withFirebase } from "../Firebase";
import dateformat from "dateformat";

const now = new Date();
const date = dateformat(now, "yyyy-mm-dd");

const Add = ({ firebase }) => {
  const [image, setImage] = useState(null);
  const [loadImage, setLoadImage] = useState(false);

  console.log(loadImage);
  

  const onChangeInput = (event) => {
    const file = event.target.files[0];

    let fileUrl = `${file.name.split(".")[0]}${Date.now()}.${
      file.name.split(".")[1]
    }`;

    const uploadTask = firebase.uploadImage(fileUrl).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = snapshot.bytesTransferred === snapshot.totalBytes;
        console.log(progress);
        

        setLoadImage(progress);
      },
      (error) => console.log(error),
      () => {
        firebase
          .downloadImage("images")
          .child(fileUrl)
          .getDownloadURL()
          .then((url) => {
            setImage(url);
          });
      }
    );
  };

  return (
    <div>
      <h2 className="text-success pt-2">Add</h2>
      <form>
        <div className="mb-2">
          <label htmlFor="title" className="form-label">
            Product Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Iphone 11 Pro Max"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description" className="form-label">
            Product Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Cool device"
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
            placeholder="999.99$"
            min="0.1"
            max="99999999.99"
            step="0.1"
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="sale" className="form-label">
            Sale
          </label>
          <input
            type="number"
            className="form-control"
            id="sale"
            placeholder="10$"
            min="0.1"
            max="99999999.99"
            step="0.1"
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="date" className="form-label">
            Sale
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            min={date}
            required
          />
        </div>
        <div className="form-file">
          <label htmlFor="file" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="file"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={onChangeInput}
          />
          {image ? <img src={image} alt="upload_image" height="100px" /> : null}
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default withFirebase(Add);
