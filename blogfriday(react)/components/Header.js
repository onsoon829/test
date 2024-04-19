import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userState, setUserState] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    const state = localStorage.getItem("user_state");
    setIsLoggedIn(isLogin);
    setUserState(state);
  }, []);

  const handlelogoClick = () => {
    navigate("/shophome");
  };

  const search = (product_name) => {
    navigate(`/search/${product_name}`);
  };

  const categorysearch = (category_name) => {
    navigate(`/searchcategory/${category_name}`);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    search(inputValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleImgClick = () => {
    navigate("/seller/product/list");
  };

  const naviChat = () => {
    navigate("/chat/home");
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user_state");
    localStorage.removeItem("user_idemail");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_code");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    setUserState(null);
    navigate("/");
  };

  const handleMyPageClick = () => {
    navigate("/mypage");
  };

  return (
    <div className="header">
      <div className="header-box">
        <div className="blank0"></div>
        <a href="/shophome">
          <div className="logo" onClick={handlelogoClick} />
        </a>
        <div className="blank1"></div>
        <div className="topmid">
          <input
            type="text"
            className="search-input"
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <div className="search-button" onClick={handleSearchClick}></div>
        </div>

        {isLoggedIn ? (
          <>
            {/* <button className="myPage" onClick={naviChat}>
              채팅
            </button> */}
            <div className="productsave" onClick={handleLogoutClick}>
              로그아웃
            </div>
            <div className="productsave" onClick={handleMyPageClick}>
              My
            </div>
            <div className="productsave" onClick={handleMyPageClick}>
              장바구니
            </div>
            {userState === "2" && (
              <div className="productsave" onClick={handleImgClick}>
                판매관리
              </div>
            )}
          </>
        ) : (
          <button className="productsave" onClick={handleLoginClick}>
            로그인
          </button>
        )}
        <div className="blank3"></div>
      </div>
      <div className="header_categorybar">
        <div className="header_categoryfront">카테고리 검색바</div>
        <div
          className="header_categorybox"
          onClick={() => categorysearch("패션")}
        >
          패션
        </div>
        <div
          className="header_categorybox"
          onClick={() => categorysearch("식품")}
        >
          식품
        </div>
        <div
          className="header_categorybox"
          onClick={() => categorysearch("가전제품")}
        >
          가전제품
        </div>
        <div
          className="header_categorybox"
          onClick={() => categorysearch("가구")}
        >
          가구
        </div>
        <div
          className="header_categorybox"
          onClick={() => categorysearch("뷰티")}
        >
          뷰티
        </div>
        <div
          className="header_categorybox"
          onClick={() => categorysearch("기타")}
        >
          기타
        </div>
      </div>
    </div>
  );
};

export default Header;
