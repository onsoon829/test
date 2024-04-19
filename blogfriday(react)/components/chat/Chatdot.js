import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Chatdot.css";

const Chatdot = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    user_idemail: "",
    user_name: "",
    user_phonenumber: "",
    user_nickname: "",
    user_code: "",
    user_profile: null,
  });

  const {
    user_idemail,
    user_name,
    user_phonenumber,
    user_nickname,
    user_code,
  } = user;

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  const info = async () => {
    try {
      const response = await axios.get(
        `/user/${localStorage.user_idemail}`,
        config
      );
      setUser((prev) => ({ ...prev, ...response.data }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    info();
  }, []);

  const navichat = () => {
    navigate("/chat");
  };

  const navihome = () => {
    navigate("/chat/home");
  };

  const naviset = () => {
    navigate("/chat/set");
  };

  const goToEditInfo = () => {
    navigate("/editinfo");
  };

  const handleWithdrawal = async () => {
    if (window.confirm("탈퇴하시겠습니까?")) {
      try {
        await axios.delete(
          `/user/delete/${localStorage.getItem("user_idemail")}`,
          config
        );
        localStorage.clear();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="chat">
      <div className="chat_menubar">
        <div className="blank0"></div>
        <div className="chat_menubar_button_f" onClick={navihome}></div>
        <div className="chat_menubar_button_c" onClick={navichat}></div>
        <div className="chat_menubar_button_d_c"></div>
        <div className="chat_menubar_button_s" onClick={naviset}></div>
      </div>

      <div className="chat_body">
        <div>
          <div className="chat_header"></div>

          <div className="chatdot-form-container">
            <h1>{localStorage.user_name}님의 정보</h1>
            <div className="form-group mb-1">
              <img
                src={
                  user.user_profile
                    ? `/profileimages/${user.user_profile}`
                    : "/basicicon/no-profile.png"
                }
                alt="프로필 사진"
                className="profile-image"
              />
            </div>
            <div className="chatdot-form-group mb-1">
              <label>이메일</label>
              <input
                type="email"
                className="form-control"
                value={user_idemail}
                readOnly
              />
            </div>
            <div className="chatdot-form-group mb-1">
              <label>이름</label>
              <input
                type="text"
                className="form-control"
                value={user_name}
                readOnly
              />
            </div>
            <div className="chatdot-form-group mb-1">
              <label>연락처</label>
              <input
                type="text"
                className="form-control"
                value={user_phonenumber}
                readOnly
              />
            </div>
            <div className="chatdot-form-group mb-1">
              <label>닉네임</label>
              <input
                type="text"
                className="form-control"
                value={user_nickname}
                readOnly
              />
            </div>
            <div className="chatdot-form-group mb-1">
              <label>친구추가 코드</label>
              <input
                type="text"
                className="form-control"
                value={user_code}
                readOnly
              />
            </div>
            <button className="chatdot-btn btn-primary" onClick={goToEditInfo}>
              회원정보 수정하기
            </button>

            <button
              type="button"
              className="btn btn-danger mt-2"
              onClick={handleWithdrawal}
            >
              회원 탈퇴하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatdot;
