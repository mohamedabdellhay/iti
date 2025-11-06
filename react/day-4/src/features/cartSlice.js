import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  count: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, product) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.products.push(product);
      state.count = state.products.length;
    },
    deleteProduct: (state, id) => {
      state.products = state.products.filter((ele) => ele.id === id);
      state.count = state.products.length;
    },
    reset: (state) => {
      state.products = [];
      state.count = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, deleteProduct, reset } = cartSlice.actions;

export default cartSlice.reducer;
