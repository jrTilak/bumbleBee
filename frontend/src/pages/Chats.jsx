import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Chats = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn, currentUser, isFetching } = useAuthContext();

  useEffect(() => {
    if (!isUserLoggedIn) {
      toast.error("You need to login first!");
      // href to /login using react-router-dom
      navigate("/login");
    }
  }, [isUserLoggedIn]);
  return <div>Chats</div>;
};

export default Chats;
