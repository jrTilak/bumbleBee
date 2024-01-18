import React, { createContext, useState, useContext, useEffect } from "react";
import { login, signup, signupAsGuest, validateToken } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getAuthStatus = async () => {
      setIsFetching(true);
      validateToken()
        .then((res) => {
          if (res.data) {
            setIsUserLoggedIn(true);
            setCurrentUser(res.data);
            navigate("/chats");
            setIsFetching(false);
          } else {
            setIsFetching(false);
          }
        })
        .catch((err) => {
          setIsFetching(false);
          if (err.status === 401) {
            toast.error(err.message);
          }
        });
    };
    getAuthStatus();
  }, []);

  const userLogin = async (email, password) => {
    toast.promise(login(email, password), {
      loading: "Logging in...",
      success: (res) => {
        setIsUserLoggedIn(true);
        setCurrentUser(res.data);
        // href to /chats using react-router-dom
        navigate("/chats");
        setIsFetching(false);
        return res.message;
      },
      error: (err) => {
        setIsFetching(false);
        return err.message;
      },
    });
  };

  const userSignup = async (name, email, password) => {
    toast.promise(signup(name, email, password), {
      loading: "Hold on, we're signing you up...",
      success: (res) => {
        setIsUserLoggedIn(true);
        setCurrentUser(res.data);
        // href to /chats using react-router-dom
        navigate("/chats");
        setIsFetching(false);
        return res.message;
      },
      error: (err) => {
        setIsFetching(false);
        return err.message;
      },
    });
  };
  const userSignupAsGuest = async (name, email, password) => {
    toast.promise(signupAsGuest(), {
      loading: "Hold on, we're signing you up...",
      success: (res) => {
        setIsUserLoggedIn(true);
        setCurrentUser(res.data);
        // href to /chats using react-router-dom
        navigate("/chats");
        setIsFetching(false);
        return res.message;
      },
      error: (err) => {
        setIsFetching(false);
        return err.message;
      },
    });
  };

  const value = {
    isUserLoggedIn,
    setIsUserLoggedIn,
    currentUser,
    setCurrentUser,
    isFetching,
    setIsFetching,
    userLogin,
    userSignup,
    userSignupAsGuest,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
