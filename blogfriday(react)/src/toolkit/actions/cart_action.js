import axios from "axios";

// 프록시를 통해 요청을 보낼 주소

// By KKW
export const fetchCartList = async (userId) => {
  try {
    const response = await axios.get("/api/cart/list/" + userId);

    return response;
  } catch (error) {
    console.log("fetchCartList :", error);
  }
};

//장바구니 추가
export const fetchCartAdd = async (cartProductCode) => {
  try {
    const response = await axios.post(`/add`, { cartProductCode });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("fetchCartAdd :", error);
  }
};

//장바구니 수정
export const updateCartProductCount = async (cart_product_code) => {
  try {
    const response = await axios.put(`/update`, { cart_product_code });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("updateCartProductCount :", error);
  }
};

//장바구니 삭제
export const fetchCartDelete = async (cartProductCode) => {
  try {
    const response = await axios.delete(`/${cartProductCode}`);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log("fetchCartDelete:", error);
  }
};
