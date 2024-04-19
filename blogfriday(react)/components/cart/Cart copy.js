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
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 상품코드 받아오기

  const [cartItems, setCartItems] = useState([]); // 카트 아이템 상태

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
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

  // const [cartInfo, setCartInfo] = useState({
  //   cartAddress: "",
  //   cartInstruction: "",
  //   quantity: 1,
  // });

  // const [product, setProduct] = useState({
  //   product_name: "차은우 옷갈아입히기 세트",
  //   product_price: 9990000,
  // });

  // const cartList = useSelector((state) => state.product.cartList);
  // const cartImgList = useSelector((state) => state.product.cartImgList);

  // const [cartMethod, setCartMethod] = useState("");
  // const [paymentResult, setPaymentResult] = useState("");

  // const handleInputChange = (e) => {
  //   setCartInfo({ ...cartInfo, [e.target.name]: e.target.value });
  // };

  // const handleQuantityChange = (e) => {
  //   setCartInfo({ ...cartInfo, quantity: parseInt(e.target.value) });
  // };

  // const handlePaymentMethodChange = (e) => {
  //   setCartMethod(e.target.value);
  // };

  // const submitOrder = () => {
  //   const orderData = {
  //     cartAddress: cartInfo.cartAddress,
  //     cartInstruction: cartInfo.cartInstruction,
  //     quantity: cartInfo.quantity,
  //     totalAmount: product.product_price * cartInfo.quantity,
  //     orderDate: new Date(),
  //     orderAmount: product.product_price * cartInfo.quantity,
  //   };
  // };
  // const onhandlebuybutton = () => {
  //   navigate(`/payment/${product_code}`);
  // };

  // const location = useLocation();
  // const cartData = location.state;
  // console.log(location.state);

  // const [amount, setAmount] = useState();
  // //받아온 물건 띄우기?
  // const CartList = async () => {
  //   await axios.get(`/api/cart/list/${localStorage.user_id}`, {
  //     product_code: product_code,
  //     user_id: user_id,
  //     cart_product_count: amount,
  //   });
  // };

  // const handlePayment = () => {
  //   navigate("/PaymentPage");
  // };

  // useEffect(() => {
  //   console.log("+++++++", product_code);
  //   dispatch(productActions.getProductDetail(product_code));
  //   dispatch(productActions.getProductimgDownload(product_code));
  // }, []);
  // const userId = localStorage.getItem("user_id");
  // const fetchData = async () => {
  //   try {
  //     const data = await fetchCartList(userId);
  //     if (data && Array.isArray(data)) {
  //       // 데이터가 유효하고 배열인지 확인
  //       setCartItems(data);
  //     } else {
  //       console.error("Error fetching cart items: Invalid data format");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching cart items:", error);
  //   }
  // };
  //  }, []);

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

  // //총상품가격
  // const totalSum = cartItems.reduce((acc, item) => {
  //   const itemTotal = cart_product_count * product_price;
  //   return acc + itemTotal;
  // }, 0);

  // //총 할인
  // const totalSale = cartItems.reduce((acc, item) => {
  //   const itemSale = (item.cart_product_count * item.product_price) / 10;
  //   return acc + itemSale;
  // }, 0);

  //결제하기로 넘어가기
  // const handleButtonClick = () => {
  //   navigate("/PaymentPage");
  // };

  return (
    <div>
      <h2>장바구니</h2>
      <div className="main-bg"></div>
      <HorizonLine />
      <div className="right-box">
        <div className="cart-header">주문예상가격</div>
        {cartList && cartList.product_price ? (
          <p>총상품가격 : {cartList.product_price}원</p>
        ) : (
          <p>총상품가격 : 데이터 없음</p>
        )}
        <p>총 할인 : 원</p>

        <div className="cart-total">총금액 : 원</div>
        <div className="cart-checkout">
          <button onClick={() => navigate("/payment/:product_code")}>
            결제하기
          </button>
        </div>
      </div>

      <ul>
        {cartItems.map((item, index) => (
          <div key={index}>
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
      <footer>{/* 푸터 내용 */}</footer>
    </div>
  );
};

export default CartComponent;

// import React, { useState, useEffect } from "react";
// import { fetchCartList, fetchCartDelete } from "../../toolkit/actions/cart_action";
// import "./CartItem.css";
// import HorizonLine from "./HorizonLine";
// import CartItem from "./CartItem";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { productActions } from "../../toolkit/actions/product_action";

// const CartComponent = () => {
//   const [cartItems, setCartItems] = useState([]); // 카트 아이템 상태
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { product_code } = useParams(); // 상품코드 받아오기
//   const user_id = localStorage.getItem("user_id");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchCartList(user_id);
//         if (data && Array.isArray(data)) {
//           // 데이터가 유효하고 배열인지 확인
//           setCartItems(data);
//         } else {
//           console.error("Error fetching cart items: Invalid data format");
//         }
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//       }
//     };

//     fetchData();
//   }, [user_id]);

//   const handleDelete = async (cartProductCode) => {
//     try {
//       await fetchCartDelete(cartProductCode); // fetchCartDelete 함수 호출
//       const newData = cartItems.filter((item) => item.cart_product_code !== cartProductCode);
//       setCartItems(newData); // 새로운 데이터로 상태 업데이트
//     } catch (error) {
//       console.error("Error deleting cart item:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>장바구니</h2>
//       <div className="main-bg"></div>
//       <HorizonLine />
//       <div className="right-box">
//         <div className="cart-header">주문예상가격</div>
//         {/* 주문 예상 가격 및 기타 정보 출력 */}
//       </div>

//       <ul>
//         {cartItems.map((item, index) => (
//           <div key={index}>
//             <div className="product-img"></div>
//             <CartItem
//               key={index}
//               name={item.product_name}
//               count={item.cart_product_count}
//               price={item.product_price}
//             />
//             <button onClick={() => handleDelete(item.cart_product_code)}>선택삭제</button>
//           </div>
//         ))}
//       </ul>

//       <HorizonLine />
//       <footer>{/* 푸터 내용 */}</footer>
//     </div>
//   );
// };

// export default CartComponent;
