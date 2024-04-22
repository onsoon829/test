import React, { useState, useEffect } from "react";
import {
  fetchCartList,
  fetchCartDelete,
  updateCartProductCount,
} from "../../toolkit/actions/cart_action";
import "./CartItem.css";

import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CartComponent = () => {
  const navigate = useNavigate();
  const { product_code } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [isChecked, setIsChecked] = useState({});
  console.log("cartItems:", cartItems);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    console.log("user_id:", user_id);
    if (!user_id) {
      alert("로그인이 필요한 서비스입니다");
      navigate("/login");
    } else {
      (async () => {
        const res = await fetchCartList(user_id);
        if (res.status === 200) {
          setCartItems(res.data.cartList);
          const initialCheckState = {};
          res.data.cartList.forEach((item) => {
            initialCheckState[item.cart_product_code] = false;
          });
          setIsChecked(initialCheckState);
        }
      })();
    }
  }, []);

  //삭제 기능
  const handleDelete = async (cartProductCode) => {
    try {
      await fetchCartDelete(cartProductCode);
      const newData = cartItems.filter(
        (item) => item.cart_product_code !== cartProductCode
      );
      setCartItems(newData);
      const updatedCheckState = { ...isChecked };
      delete updatedCheckState[cartProductCode];
      setIsChecked(updatedCheckState);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  //장바구니 수량 수정
  const handleCountChange = async (cartProductCode, newCount) => {
    try {
      const res = await updateCartProductCount(cartProductCode, newCount);
      if (res.status === 200) {
        const updatedCartItems = [...cartItems];
        const index = updatedCartItems.findIndex(
          (item) => item.cart_product_code === cartProductCode
        );
        updatedCartItems[index].cart_product_count = newCount;
        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.error("Error updating cart item count:", error);
    }
  };

  //총상품가격
  const totalSum = cartItems.reduce((acc, item) => {
    if (isChecked[item.cart_product_code]) {
      const itemTotal = item.cart_product_count * item.product_price;
      return acc + itemTotal;
    }
    return acc;
  }, 0);

  //할인율
  const totalSale = cartItems.reduce((acc, item) => {
    if (isChecked[item.cart_product_code]) {
      const itemSale = (item.cart_product_count * item.product_price) / 10;
      return acc + itemSale;
    }
    return acc;
  }, 0);

  const productDetail = useSelector((state) => state.product.productDetail);
  const productImgDetail = useSelector(
    (state) => state.product.productImgDetail
  );

  //결제하기로 넘어가기
  const onhandlepaybutton = () => {
    navigate(`/payment/${productDetail.product_code}`);
  };

  const handleCheckChange = (cartProductCode) => {
    setIsChecked({
      ...isChecked,
      [cartProductCode]: !isChecked[cartProductCode],
    });
  };

  const handleCountIncrement = (cartProductCode) => {
    const updatedCartItems = [...cartItems];
    const index = updatedCartItems.findIndex(
      (item) => item.cart_product_code === cartProductCode
    );
    updatedCartItems[index].cart_product_count++;
    setCartItems(updatedCartItems);
    handleCountChange(
      cartProductCode,
      updatedCartItems[index].cart_product_count
    );
  };

  //수량 변경
  const handleCountDecrement = (cartProductCode) => {
    const updatedCartItems = [...cartItems];
    const index = updatedCartItems.findIndex(
      (item) => item.cart_product_code === cartProductCode
    );
    if (updatedCartItems[index].cart_product_count > 1) {
      updatedCartItems[index].cart_product_count--;
      setCartItems(updatedCartItems);
      handleCountChange(
        cartProductCode,
        updatedCartItems[index].cart_product_count
      );
    }
  };

  return (
    <div className="cart_container">
      <h2>장바구니</h2>
      <div>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.cart_product_code} className="cart_item">
              <p>이름: {item.product_name}</p>
              <p>가격: {item.product_price}원</p>
              <div className="quantity_control">
                <button
                  onClick={() => handleCountDecrement(item.cart_product_code)}
                >
                  -
                </button>
                <span>{item.cart_product_count}</span>
                <button
                  onClick={() => handleCountIncrement(item.cart_product_code)}
                >
                  +
                </button>
              </div>
              <input
                type="checkbox"
                id={item.cart_product_code}
                className="checkbox-input"
                checked={isChecked[item.cart_product_code] || false}
                onChange={() => handleCheckChange(item.cart_product_code)}
              />
              <label
                htmlFor={item.cart_product_code}
                className="checkbox-label"
              >
                <span
                  className={`checkbox-custom ${
                    isChecked[item.cart_product_code] ? "checkbox-checked" : ""
                  }`}
                ></span>
              </label>
              <div>
                <button onClick={() => handleDelete(item.cart_product_code)}>
                  삭제
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>장바구니에 상품이 없습니다.</p>
        )}
      </div>
      <div className="checkout-box">
        <div className="font">
          <p>주문예상가격</p>
        </div>
        <p>총상품가격: {totalSum}원</p>
        <p>총 할인: {totalSale}원</p>
        <p>총금액: {totalSum - totalSale}원</p>
        <button className="button:hover" onClick={onhandlepaybutton}>
          결제하기
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
