import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../toolkit/actions/chat_Action";
import "./Chat.css";

const ChatHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navichat = () => {
    navigate("/chat");
  };
  const navihome = () => {
    navigate("/shophome");
  };
  const navidot = () => {
    navigate("/chat/dot");
  };

  const naviset = () => {
    navigate("/chat/set");
  };

  const [userCode, setUserCode] = useState({
    user_code1: localStorage.getItem("user_code"),
    user_code2: "",
  });

  const handleUserCodeChange = (event) => {
    setUserCode({
      ...userCode,
      user_code2: event.target.value,
    });
  };

  const addFriend = (event) => {
    event.preventDefault(); //  리로드 방지
    dispatch(chatActions.getFriendInsert(userCode));

    setUserCode({
      ...userCode,
      user_code2: "", // user_code2를 초기화
    });
  };

  const { friendList } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(chatActions.getFriendList(userCode.user_code1));
  }, [userCode]);

  return (
    <>
      <div className="chat">
        <div className="chat_menubar">
          <div className="blank0"></div>
          <div className="chat_menubar_button_f_c" onClick={navihome}></div>
          <div className="chat_menubar_button_c" onClick={navichat}></div>
          <div className="chat_menubar_button_d" onClick={navidot}></div>
          <div className="chat_menubar_button_s" onClick={naviset}></div>
        </div>

        <div className="chat_body">
          <div>
            <div className="chat_header">
              <form onSubmit={addFriend}>
                <input
                  type="text"
                  value={userCode.user_code2}
                  onChange={handleUserCodeChange}
                  placeholder="친구 코드 입력"
                />
                <button type="submit">친구추가</button>
              </form>
              <div>친구</div>
            </div>
            <div className="chat_friendlist">
              {friendList &&
                friendList.map((chat) => (
                  <div className="chat_friendbox" key={chat.user_id}>
                    <div className="chat_profileimg"></div>
                    <div className="chat_name">{chat.user_name}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHome;
