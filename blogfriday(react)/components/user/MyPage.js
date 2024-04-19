import React, { useRef } from "react";
import axios from "axios";
import "./MyPage.css";

const MyPage = () => {
  const userInfoRef = useRef(null);
  const editInfoRef = useRef(null);
  const deleteUserRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref.current) {
      const yOffset = -window.innerHeight / 2 + ref.current.clientHeight / 2; // 요소의 높이를 고려하여 조정
      const yPosition =
        ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: yPosition,
        behavior: "smooth",
      });
    }
  };

  const changeState = async (e) => {
    e.preventDefault();
    await axios.put(`/user/updatestate/${localStorage.getItem("user_id")}`);
  };

  return (
    <>
      <div className="mypage_upper">
        <div className="mypage_upperh">도움말</div>
      </div>
      <div className="mypage_body">
        <div className="mypage_menu_box">
          <div
            className="mypage_menu_button"
            onClick={() => scrollToRef(userInfoRef)}
          >
            내정보
          </div>
          <div
            className="mypage_menu_button"
            onClick={() => scrollToRef(editInfoRef)}
          >
            정보 수정
          </div>
          <div
            className="mypage_menu_button"
            onClick={() => scrollToRef(deleteUserRef)}
          >
            회원 탈퇴
          </div>
        </div>
        <div className="mypagebody">
          <div className="mypage_myimg" ref={userInfoRef}>
            <div className="mypage_underbox1">내정보 섹션</div>
          </div>
          <div className="mypageinput2" ref={editInfoRef}>
            <div className="mypage_underbox2">정보 수정 섹션</div>
          </div>
          <div className="mypageinput3" ref={deleteUserRef}>
            <div className="mypage_underbox3">회원 탈퇴 섹션</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
