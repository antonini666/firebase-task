import React from "react";

const Add = ({
  item,
  handleSubmit,
  handleChange,
  errorClass,
  fieldErrors,
  date,
  errorCount,
}) => {
  console.log(errorCount(fieldErrors));

  return (
    <div>
      <h2 className="text-success pt-2">Add</h2>
      <form onSubmit={handleSubmit} className="mx-auto col-md-8">
        <div className="mb-2">
          <label htmlFor="title" className="form-label">
            Product Title
          </label>
          <input
            type="text"
            className={`form-control ${errorClass(fieldErrors.title)}`}
            id="title"
            name="title"
            placeholder="Iphone 11 Pro Max"
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{fieldErrors.title}</div>
        </div>
        <div className="mb-2">
          <label htmlFor="description" className="form-label">
            Product Description
          </label>
          <textarea
            className={`form-control ${errorClass(fieldErrors.description)}`}
            id="description"
            name="description"
            rows="3"
            placeholder="Cool device"
            onChange={handleChange}
          />
          <div className="invalid-feedback">{fieldErrors.description}</div>
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
            onChange={handleChange}
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
            placeholder="15%"
            min="10"
            max="90"
            step="1"
            autoComplete="off"
            disabled={item.price ? false : true}
            onChange={handleChange}
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
            disabled={item.discount ? false : true}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-file">
          <label htmlFor="file" className="form-label">
            Image
          </label>
          <input
            type="file"
            className={`form-control`}
            id="file"
            name="image"
            accept="image/*"
            required
            onChange={handleChange}
          />
          <div className="invalid-feedback">{fieldErrors.image}</div>

          {item.image ? (
            <img
              src={item.image}
              alt="upload_image"
              height="100px"
              className="m-2"
            />
          ) : null}
        </div>
        <button
          type="submit"
          className="btn btn-success mt-3"
          disabled={!errorCount(fieldErrors)}
        >
          Add item
        </button>
      </form>
    </div>
  );
};

export default Add;
