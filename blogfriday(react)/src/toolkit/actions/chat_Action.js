import axios from "axios";
import { chatRoomReducers } from "../reducers/chatReducer";
import { useDispatch } from "react-router-dom";
//친구추가

function getFriendInsert(user_id2) {
  return async (dispatch) => {
    await axios
      .post(`/api/chat/friendinsert`, user_id2)
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert(data);
        return data;
      })

      .catch((error) => {
        console.log(error);
        alert("친구추가실패");
      });
  };
}

//친구목록
function getFriendList(user_id1) {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/chat/friendlist/${user_id1}`)
      .then((Response) => Response.data);
    console.log("Map", data);

    dispatch(chatRoomReducers.getFriendList(data));
  };
}

function getNLPsearch(text) {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/ai/predict/${text}`)
      .then((Response) => Response.data);
    console.log("nlp리턴", data);

    // dispatch(chatRoomReducers.getFriendList(data));
  };
}

export const chatActions = {
  getFriendInsert,
  getFriendList,
  getNLPsearch,
};
