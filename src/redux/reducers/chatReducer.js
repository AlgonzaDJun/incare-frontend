import axios from "axios";

/* eslint-disable no-unused-vars */
const initialState = {
  messages: [],
  users: [],
  typingUsers: [],
};

export default function (state = initialState, action) {
  // SEND MESSAGE AND RECEIVE
  switch (action.type) {
    case "SEND_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case "RECEIVE_MESSAGE":
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
}

function sendMessage(message) {
  return {
    type: "SEND_MESSAGE",
    payload: message,
  };
}

function receiveMessage(message) {
  return {
    type: "RECEIVE_MESSAGE",
    payload: message,
  };
}

export function handleSendMessage(message) {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/pusher`,
        message
      );
      // dispatch(sendMessage(message));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getChatBySenderReceiver(senderId, receiverId) {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/pusher/${senderId}/${receiverId}`
      );
      dispatch(receiveMessage(res.data));
    } catch (error) {
      console.log(error);
    }
  };
}
