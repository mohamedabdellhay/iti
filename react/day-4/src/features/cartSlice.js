import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  count: 0,
  isLoaded: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartFromStorage: (state, products) => {
      state.products.push(products);
      state.count = products.length;
      state.isLoaded = true;
    },
    addProduct: (state, product) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.products.push(product);
      state.count = state.products.length;
      localStorage.setItem(
        "cart",
        JSON.stringify({ products: state.products })
      );
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
export const loadCartFromStorage = () => (dispatch) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  dispatch(setCartFromStorage(cart));
};
// Action creators are generated for each case reducer function
export const { setCartFromStorage, addProduct, deleteProduct, reset } =
  cartSlice.actions;

export default cartSlice.reducer;
