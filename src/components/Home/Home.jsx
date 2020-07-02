import React from "react";

const Home = ({ items, loading, onRemoveItem }) => {
  return (
    <div>
      <h2 className="text-success pt-2">Home</h2>
      <div>
        {loading && <div>Loading ...</div>}

        {items ? (
          <ItemList items={items} onRemoveItem={onRemoveItem} />
        ) : (
          <div>There are no items...</div>
        )}
      </div>
    </div>
  );
};

const ItemList = ({ items, onRemoveItem }) => (
  <ul>
    {items.map((item) => (
      <Item key={item.uid} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
);

const Item = ({ item, onRemoveItem }) => {
  return (
    <li>
      <span>{item.text}</span>

      <button
        type="button"
        className="btn btn-danger"
        onClick={() => onRemoveItem(item.uid)}
      >
        Delete
      </button>
    </li>
  );
};

export default Home;
