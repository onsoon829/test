import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCartList } from "../toolkit/actions/cart_action";
import { database } from "../database/data";
import CartItem from "../components/cart/CartItem";

import HorizonLine from "../components/cart/HorizonLine";

const CartPage = () => {
  // const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState([]);

  // useEffect(() => {
  //   // if (!userId) {
  //   //   alert("로그인 해야 돼!");
  //   //   return;
  //   // }
  //   (async () => {
  //     try {
  //       // setLoading(true);
  //       // 은주씨. 그녀가 짠 인증 코드
  //       // const auth = localStorage.getItem("auth");
  //       const userId = 1;

  //       const data = await fetchCartList(userId);
  //       setCartData(data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       // setLoading(false);
  //     }
  //   })();
  // }, []);

  // if (loading) return "Loading...";

  //총상품가격
  const totalSum = cartData.reduce((acc, item) => {
    const itemTotal = item.cart_product_count * item.product_price;
    return acc + itemTotal;
  }, 0);

  //총 할인
  const totalSale = cartData.reduce((acc, item) => {
    const itemSale = (item.cart_product_count * item.product_price) / 10;
    return acc + itemSale;
  }, 0);

  //배송비
  const totaldelivery = cartData.reduce(() => {
    const delivery = 3000;
    return delivery;
  }, 0);

  useEffect(() => {
    (async () => {
      const userId = 1;
      const response = await database.filter((item) => item.user_id === userId);
      setCartData(response);
      console.log("response:", response);
    })();
  }, []);

  const deleteAll = () => {
    setCartData([]);
  };
  const handleClick = () => {
    alert("클릭클릭");
  };

  return (
    <div>
      <h1>장바구니</h1>
      <div className="main-bg"></div>
      <HorizonLine />
      <div className="right-box">
        <p>주문예상가격</p>
        <p>총상품가격 : {totalSum}원</p>
        <p>총 할인 : {totalSale}원</p>
        <p>배송비: {totaldelivery}원</p>
        <p>총금액 : {totalSum - totalSale + totaldelivery}원</p>
        <button
          onClick={() => {
            alert("결제하기!");
          }}
        >
          구매하기
        </button>
      </div>
      <button onClick={deleteAll}>전체 삭제</button>
      {cartData &&
        cartData.map((item, index) => (
          <CartItem
            key={index}
            deleteAll={deleteAll}
            image={item.product_img[0]}
            name={item.product_name}
            count={item.cart_product_count}
            price={item.product_price}
          />
        ))}

      <div>
        <p>총계 : {totalSum} 원</p>
        <button
          onClick={() => {
            alert("결제하기!");
          }}
        >
          결제하기
        </button>
      </div>

      <button onClick={handleClick}>버튼</button>
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

export default CartPage;
