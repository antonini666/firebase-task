import { ITEM_SET } from "./actions";

const initialState = {
  item: {
    title: "",
    description: "",
    price: "",
    discount: "",
    discountDate: "",
    image: "",
    hello: "",
  },
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_SET:
      return {
        item: action.payload,
      };
    default:
      return state;
  }
};
