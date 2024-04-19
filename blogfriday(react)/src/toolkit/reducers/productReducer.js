import { createSlice } from "@reduxjs/toolkit";

//action타입, actioncreater,reducer를 여기에서 설정

let initialState = {
  product: {},
  productDetail: {},
  productImgDetail: {},
  productList: [],
  productImages: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct(state, action) {
      state.productDetail = action.payload.data;
    },

    getPoductImg(state, action) {
      state.productImgDetail = action.payload.data;
    },

    getProductList(state, action) {
      state.productList = action.payload.productList;
      state.productImages = action.payload.productImages;
    },
  },
});

export const productReducers = productSlice.actions;

export default productSlice;
