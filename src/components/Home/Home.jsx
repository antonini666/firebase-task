import React from "react";

import DiscountTimer from "../DiscountTimer";
import "./Home.scss";

const Home = ({ items, loading, onRemoveItem }) => {
  return (
    <div>
      <h2 className="text-success pt-2">Home</h2>
      <React.Fragment>
        {loading && <div>Loading ...</div>}

        {items ? (
          <ItemList items={items} onRemoveItem={onRemoveItem} />
        ) : (
          <div>There are no items...</div>
        )}
      </React.Fragment>
    </div>
  );
};

const ItemList = ({ items, onRemoveItem }) => (
  <div className="product-list">
    {items.map((item) => (
      <Item key={item.uid} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </div>
);

const Item = ({ item, onRemoveItem }) => {
  const {
    title,
    description,
    price,
    discount,
    discountDate,
    image,
    uid,
  } = item;

  const dates = Date.parse(discountDate);

  const discoutnPrice = (
    +item.price -
    (+item.price * +item.discount) / 100
  ).toFixed(2);

  return (
    <div className="card">
      <img src={image} alt="" width="100%" className="card-img" />
      <div className="card-body justify-between">
        <div className="d-flex flex-column text-center">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>

        <div className="card-bottom">
          <div className="card-price__wrap">
            {discount ? (
              <React.Fragment>
                <div className="d-flex align-items-center prices">
                  <div className="price price--old">{price}$</div>
                  <div className="price price--new">{discoutnPrice}$</div>
                  <div className="discount">{discount}% off</div>
                </div>
                <DiscountTimer discountDates={dates} />
              </React.Fragment>
            ) : (
              <div className="price">{price}$</div>
            )}
          </div>
          <div className="btn-wrap">
            <button className="btn btn-outline-primary">Edit</button>

            <button
              className="btn btn-outline-danger"
              onClick={() => onRemoveItem(uid)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
