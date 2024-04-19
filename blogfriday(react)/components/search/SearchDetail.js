import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SearchDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../toolkit/actions/product_action";
import { useState } from "react";
import axios from "axios";

const SearchDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product_code } = useParams();
  const user_id = localStorage.getItem("user_id");

  console.log("+++++++++", product_code);
  const productDetail = useSelector((state) => state.product.productDetail);
  const productImgDetail = useSelector(
    (state) => state.product.productImgDetail
  );

  const onhandlebuybutton = () => {
    navigate(`/payment/${productDetail.product_code}`);
  };

  const onhandleblogbutton = () => {
    navigate("/blog");
  };

  const [amount, setAmount] = useState(0);
  const amountUp = () => {
    setAmount((amount) => amount + 1);
  };
  const amountDown = () => {
    if (amount > 0) {
      //setAmount(amount - 1);
      setAmount((amount) => amount - 1);
    }
  };

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  const gocartbutton = async () => {
    console.log("add>>>>");
    await axios
      .post(
        `/api/cart/add`,
        {
          product_code: product_code,
          user_id: user_id,
          cart_product_count: amount,
        },
        config
      )
      .then((response) => navigate(`/cart`))
      .catch((error) => console.log(error));
  };

  // const handleButtonClick = () => {
  //   navigate("Cart", {
  //     state: {
  //       cart_product_code: `${cart_product_code}`,
  //       product_code: `${product_code}`,
  //       cart_product_count: `${cart_product_count}`,
  //       cart_product_price: `${cart_product_price}`,
  //       cart_product_name: `${cart_product_name}`,
  //     },
  //   });
  // };

  useEffect(() => {
    console.log("+++++++++", product_code);

    // 특정 파라미터 값(예: product_code)을 콘솔에 출력합니다.

    dispatch(productActions.getProductDetail(product_code));
    dispatch(productActions.getProductimgDownload(product_code));
  }, []);
  const imagePath = `/shopimg/${productImgDetail.product_img0}`;
  const imagePath1 = `/shopimg/${productImgDetail.product_img1}`;
  console.log("경로", imagePath);
  return (
    <>
      <h1 className="headline"></h1>
      <div className="detailbody">
        <div className="productbox">
          <img
            className="product_detail_img"
            src={imagePath}
            alt="product_img0"
            width="300"
            height="300"
          />

          <div className="product_context_box">
            <div className="product_context_box_pname">
              <div>{productDetail.product_name}</div>
            </div>
            <div className="product_context_box_pcontext">
              <div>{productDetail.product_content_text}</div>
            </div>
            <div className="product_context_box_pprice">
              <div>
                {productDetail.product_price}
                <span className="product_context_box_pprice_s">원</span>
              </div>
            </div>
            <div className="product_amount">
              <div className="product_amount_b">
                <div className="amount_bm" onClick={amountDown}>
                  -
                </div>
                <div className="amount_ba">{amount}</div>
                <div className="amount_bp" onClick={amountUp}>
                  +
                </div>
              </div>
              <div className="amount_cal">
                총{productDetail.product_price * amount}원
              </div>
            </div>
          </div>
        </div>
        <div className="productcontentbox">
          <img
            className="productcontentbox_i"
            src={imagePath1}
            alt="product_img1"
            width="300"
            height="300"
          />
        </div>
      </div>
      <div></div>
      <div class="menu-bar">
        {/* <!-- 메뉴바 내용 --> */}
        <div class="dropdown-menu">
          {/* <!-- 드롭다운 메뉴 --> */}
          옵션 선택
        </div>
        <button class="buy" onClick={onhandlebuybutton}>
          구매하기
        </button>

        <button class="cart" onClick={gocartbutton}>
          장바구니
        </button>

        {/* <!-- 소셜 아이콘 --> */}
        <div className="menu-bar-icorn">
          <img
            src="/images/Instagram_logo.png"
            alt="Instagram"
            className="social-icon"
            width="100"
            height="100"
          />
          <img
            src="/images/blog.png"
            alt="Blog"
            class="social-icon"
            width="100"
            height="100"
            onClick={onhandleblogbutton}
          />
        </div>
      </div>
    </>
  );
};

export default SearchDetail;
