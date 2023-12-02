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

export const sendChatRequest = (message) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/chat/new`,
        {
          message,
        },
        {
          withCredentials: true,
        }
      );
      const data = await res.data;
      if (res.status !== 200) {
        reject(data);
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const clearConversation = async() => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/chat/delete`,
        {
          withCredentials: true,
        }
      );
      const data = await res.data;
      if (res.status !== 200) {
        reject(data);
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
