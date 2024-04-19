import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinAdd.css";

const JoinAdd = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    user_idemail: "",
    user_password: "",
    user_name: "",
    user_phonenumber: "",
    user_nickname: "",
    user_profile: null,
    previewImage: "/basicicon/no-profile.png",
  });

  const handleValueChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUser((prev) => {
      return {
        ...prev,
        user_profile: file,
        previewImage: URL.createObjectURL(file),
      };
    });
  };

  const handleResetImage = () => {
    setUser((prev) => ({
      ...prev,
      previewImage: "/basicicon/no-profile.png",
      user_profile: null,
      fileName: "", // 파일명 초기화
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_idemail", user.user_idemail);
    formData.append("user_password", user.user_password);
    formData.append("user_name", user.user_name);
    formData.append("user_phonenumber", user.user_phonenumber);
    formData.append("user_nickname", user.user_nickname);
    formData.append("user_profile", user.user_profile);

    try {
      const response = await axios.post(`/user/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="join-add-container">
      <form onSubmit={onSubmit} className="join-add-form">
        <h1 className="join-add-title">회원가입</h1>
        <div className="join-add-form-group">
          <input
            type="email"
            className="join-add-form-control"
            name="user_idemail"
            placeholder="이메일"
            onChange={handleValueChange}
          />
        </div>
        <div className="join-add-form-group">
          <input
            type="password"
            className="join-add-form-control"
            name="user_password"
            placeholder="비밀번호"
            onChange={handleValueChange}
          />
        </div>
        <div className="join-add-form-group">
          <input
            type="text"
            className="join-add-form-control"
            name="user_name"
            placeholder="이름"
            onChange={handleValueChange}
          />
        </div>
        <div className="join-add-form-group">
          <input
            type="text"
            className="join-add-form-control"
            name="user_phonenumber"
            placeholder="연락처"
            onChange={handleValueChange}
          />
        </div>
        <div className="join-add-form-group">
          <input
            type="text"
            className="join-add-form-control"
            name="user_nickname"
            placeholder="닉네임"
            onChange={handleValueChange}
          />
        </div>
        <div className="join-add-form-group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="join-add-file-input"
          />
        </div>
        <div className="join-add-form-group">
          <img
            src={user.previewImage}
            alt="다시 기본이미지로 돌아가기"
            className="join-add-profile-preview"
          />
        </div>
        {user.user_profile && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleResetImage}
          >
            기본이미지로 설정
          </button>
        )}
        <button type="submit" className="join-add-btn-primary">
          가입 완료
        </button>
      </form>
    </div>
  );
};

export default JoinAdd;
