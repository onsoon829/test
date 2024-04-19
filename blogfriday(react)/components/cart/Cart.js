import React, { useState, useEffect } from "react";
import {
  fetchCartList,
  fetchCartDelete,
} from "../../toolkit/actions/cart_action";
import "./CartItem.css";
import HorizonLine from "./HorizonLine";
import CartItem from "./CartItem";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { productActions } from "../../toolkit/actions/product_action";

const CartComponent = () => {
  const navigate = useNavigate(); // 상품코드 받아오기

  const [cartItems, setCartItems] = useState([]); // 카트 아이템 상태

  console.log("cartItems:", cartItems);
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    console.log("user_id:", user_id);
    if (!user_id) {
      alert("로그인이 필요한 서비스입니다");
      navigate("/login");
    } else {
      (async () => {
        const data = await fetchCartList(user_id);
        if (data && Array.isArray(data)) {
          setCartItems(data);
        }
      })();
    }
  }, []);

  return <div></div>;
};

export default CartComponent;
