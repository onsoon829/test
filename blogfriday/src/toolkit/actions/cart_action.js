import axios from "axios";

// 프록시를 통해 요청을 보낼 주소
const baseUrl = "/api/cart";

// By KKW
export const fetchCartList = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/list/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("fetchCartList :", error);
  }
};

//장바구니 추가
export const fetchCartAdd = async (cartProductCode) => {
  try {
    const response = await axios.post(`${baseUrl}/add`, { cartProductCode });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("fetchCartAdd :", error);
  }
};

//장바구니 삭제
export const fetchCartDelete = async (cartProductCode) => {
  try {
    const response = await axios.delete(`${baseUrl}/${cartProductCode}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("fetchCartDelete:", error);
  }
};
