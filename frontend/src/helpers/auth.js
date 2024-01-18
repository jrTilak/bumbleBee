import axios from "axios";

export const login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      resolve(res.data);
    } catch (error) {
      reject(error.response.data);
    }
  });
};

export const signup = (name, email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`,
        {
          name: name,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      resolve(res.data);
    } catch (error) {
      reject(error.response.data);
    }
  });
};

export const signupAsGuest = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/guest`,
        {
          withCredentials: true,
        }
      );
      resolve(res.data);
    } catch (error) {
      reject(error.response.data);
    }
  });
};

export const validateToken = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/auth-status`,
        {
          withCredentials: true,
        }
      );
      resolve(res.data);
    } catch (error) {
      reject(error.response.data);
    }
  });
};

export const logout = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );
      resolve(res.data);
    } catch (error) {
      reject(error.response.data);
    }
  });
};
