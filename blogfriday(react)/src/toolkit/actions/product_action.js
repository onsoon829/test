import axios from "axios";
import { productReducers } from "../reducers/productReducer";
import { useNavigate } from "react-router-dom";

function getProductWrite(formData) {
  return async () => {
    await axios
      .post(`/api/product/save`, formData)
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert("등록성공");

        return data;
      })

      .catch((error) => {
        console.log(error);
        alert("등록에 실패하였습니다");
      });
  };
}

function getProductDetail(product_code) {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/product/content/${product_code}`)
      .then((response) => response.data);

    dispatch(productReducers.getProduct({ data }));
  };
}

function getProductimgDownload(product_code) {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/product/content/img/${product_code}`)
      .then((response) => response.data);

    dispatch(productReducers.getPoductImg({ data }));
  };
}

//검색바 물품조회
function getProductList(product_name) {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/product/list/${product_name}`)
      .then((Response) => Response.data);
    console.log("Map", data);

    dispatch(productReducers.getProductList(data));
  };
}

//카테고리 물품조회
function getProductCategoryList(category_name) {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/product/categorylist/${category_name}`)
      .then((Response) => Response.data);
    console.log("Map", data);

    dispatch(productReducers.getProductList(data));
  };
}

//판매자용조회
function getSellerList(user_id) {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/product/seller/${user_id}`)
      .then((Response) => Response.data);
    console.log("Map", data);

    dispatch(productReducers.getProductList(data));
  };
}

export const productActions = {
  getProductWrite,
  getProductDetail,
  getProductimgDownload,
  getProductList,
  getSellerList,
  getProductCategoryList,
};
