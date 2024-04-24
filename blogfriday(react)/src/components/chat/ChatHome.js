import React, { useEffect, useRef } from "react";
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

  const navidot = () => {
    navigate("/chat/dot");
  };

  const naviset = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      navigate("/chat/set");
    }
  };

  const navishop = () => {
    navigate("/shophome");
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
    setIsModalOpen(false);
  };

  const { friendList } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(chatActions.getFriendList(userCode.user_code1));
  }, [userCode.user_code1]);

  //랜더링 방지용 useCallback 으로 감싸기
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [userCode.user_code2]);

  //친구추가 modal로 덮어 씌우기
  function Modal({ isOpen, onClose, onAddFriend }) {
    if (!isOpen) return null;

    return (
      <div className="modal_overlay">
        <div className="modal">
          <button className="modal_close_button" onClick={onClose}>
            X
          </button>
          <h2>친구 추가</h2>
          <div className="modal_bar">ID로 추가</div>
          <form onSubmit={addFriend}>
            <input
              ref={inputRef}
              className="modal_submit_input"
              type="text"
              value={userCode.user_code2}
              onChange={handleUserCodeChange}
              placeholder="친구 코드 입력"
            />

            <button className="modal_submit_button" type="submit">
              친구 추가하기
            </button>
          </form>
        </div>
      </div>
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="chat">
        <div className="chat_body">
          <div>
            <div className="chat_header">
              <div className="chat_banner"></div>
              <div className="chat_header_box">
                <div className="chat_header_tag"> 친구</div>
                <div className="chat_addfriend" onClick={handleOpenModal}></div>

                <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
              </div>
            </div>
            <div className="chat_friendlist">
              {/* 내꺼 */}
              {friendList &&
                friendList
                  .filter((chat) => chat.user_code === "A10000")
                  .map((chat) => (
                    <div className="chat_friendboxt" key={chat.user_id}>
                      <img
                        className="chat_myprofileimg"
                        src={
                          localStorage.getItem("user_profile") !== "null"
                            ? `/profileimages/${localStorage.getItem(
                                "user_profile"
                              )}`
                            : "/basicicon/no-profile.png"
                        }
                        alt="비어있음"
                      ></img>
                      <div className="chat_namemh">
                        {localStorage.getItem("user_nickname")}
                      </div>
                    </div>
                  ))}
              <div className="chat_underbar"></div>
              {/* 다른사람꺼 */}
              {friendList &&
                friendList
                  .filter(
                    (chat) =>
                      chat.user_code !== "A00000" && chat.user_code !== "A10000"
                  )
                  .map((chat) => (
                    <div className="chat_friendbox" key={chat.user_id}>
                      <img
                        className="chat_profileimg"
                        src={
                          chat.user_profile
                            ? `/profileimages/${chat.user_profile}`
                            : "/basicicon/no-profile.png"
                        }
                        alt="비어있음"
                      ></img>
                      <div className="chat_nameh">{chat.user_nickname}</div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <div className="chat_menubar">
          <div className="chat_menubar_button_f_c"></div>
          <div className="chat_menubar_button_c" onClick={navichat}></div>
          <div className="chat_menubar_button_shop" onClick={navishop}></div>
          <div className="chat_menubar_button_d" onClick={navidot}></div>

          <div className="chat_menubar_button_s" onClick={naviset}></div>
        </div>
      </div>
    </>
  );
};

export default ChatHome;
