import axios from "axios";

export const getUserChats = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/chat/all-chats`,
    {
      withCredentials: true,
    }
  );
  return response.data.data;
};

export const sendChatRequest = async (message) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/chat/new`,
    {
      message,
    },
    {
      withCredentials: true,
    }
  );
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};
