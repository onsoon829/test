import React, { useState, useEffect } from "react";
import {
  fetchCartList,
  fetchCartDelete,
} from "../../toolkit/actions/cart_action";
import HorizonLine from "./HorizonLine";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // 카트 아이템 상태
  const navigate = useNavigate();

  const handlePayment = () => {
    const paymentInfo = { amount: 1000, method: "credit card" };
    navigate("/test", { state: { paymentInfo } });
  };

  useEffect(() => {
    const userId = 1; // 유저 아이디, 필요에 따라 동적으로 설정
    const fetchData = async () => {
      try {
        const data = await fetchCartList(userId); // fetchCartList 함수 호출
        setCartItems(data); // 가져온 데이터로 상태 업데이트
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchData(); // 데이터 가져오는 함수 호출
  }, []);

  const handleDelete = async (cartProductCode) => {
    try {
      await fetchCartDelete(cartProductCode); // fetchCartDelete 함수 호출
      const newData = cartItems.filter(
        (item) => item.cart_product_code !== cartProductCode
      ); // 삭제된 아이템 제외하고 새로운 데이터 생성
      setCartItems(newData); // 새로운 데이터로 상태 업데이트
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  //총상품가격
  const totalSum = cartItems.reduce((acc, item) => {
    const itemTotal = item.cart_product_count * item.product_price;
    return acc + itemTotal;
  }, 0);

  //총 할인
  const totalSale = cartItems.reduce((acc, item) => {
    const itemSale = (item.cart_product_count * item.product_price) / 10;
    return acc + itemSale;
  }, 0);

  //배송비
  const totaldelivery = cartItems.reduce(() => {
    const delivery = 3000;
    return delivery;
  }, 0);

  return (
    <div>
      <h2>장바구니</h2>
      <div className="main-bg"></div>
      <HorizonLine />
      <div className="right-box">
        <p>주문예상가격</p>
        <p>총상품가격 : {totalSum}원</p>
        <p>총 할인 : {totalSale}원</p>
        <p>배송비: {totaldelivery}원</p>
        <p>총금액 : {totalSum - totalSale + totaldelivery}원</p>
        <button onClick={handlePayment}>결제하기</button>
      </div>

      <ul>
        {cartItems.map((item, index) => (
          <div>
            <div className="product-img"></div>
            <CartItem
              key={index}
              name={item.product_name}
              count={item.cart_product_count}
              price={item.product_price}
            />
            <button onClick={() => handleDelete(item.cart_product_code)}>
              선택삭제
            </button>
          </div>
        ))}
      </ul>

      <HorizonLine />
      <footer>
        <div className="company-info">
          <h3>블로그 프라이데이 정보</h3>
          <p>상호명: 블로그 프라이데이</p>
          <p>대표이사: 김규연, 김은주, 신도일, 권순형</p>
          <p>주소: 서울시 서초구 사평대로52길 9-2</p>
          <p>통신판매업신고: 2017-서울송파-0680</p>
          <p>사업자등록번호: 529-95-82882</p>
        </div>
        <div className="contact-info">
          <h3>고객센터</h3>
          <p>전화번호: 02)532-6500</p>
          <p>영업시간: 월요일~금요일 오전 9:00~오후 6:00</p>
        </div>
        <div className="social-media">
          <h3>소셜 미디어</h3>
          <p>블로그 프라이데이 소셜 미디어 링크</p>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
