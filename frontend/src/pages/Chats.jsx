import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import pp from "../images/favicon.png";
import { VscSend } from "react-icons/vsc";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  clearConversation,
  getUserChats,
  sendChatRequest,
} from "../helpers/chats";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import ReactLoading from "react-loading";
import { logout } from "../helpers/auth";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
const Chats = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn, currentUser, isFetching } = useAuthContext();
  const [isChatSending, setIsChatSending] = useState(false); //for disabling the send button
  const [formData, setFormData] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [userCredits, setUserCredits] = useState(0);
  const navRef = useRef();

  useEffect(() => {
    if (currentUser) {
      setUserCredits(currentUser.credits);
    }
  }, [currentUser]);

  const handleSubmit = async () => {
    if (formData.length === 0) return toast.error("Please enter a message!");
    if (isChatSending)
      return toast.error("Please wait for the previous message to be sent!");
    setIsChatSending(true);
    const content = formData;
    const newMessage = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    setFormData("");
    sendChatRequest(content)
      .then((res) => {
        console.log(res);
        setChatMessages((prev) => [...prev, res.data]);
        setIsChatSending(false);
        setUserCredits((prev) => prev - 1);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message || "Something went wrong");
        //remove the message from the chat
        setChatMessages((prev) => prev.slice(0, prev.length - 1));
        setIsChatSending(false);
        setFormData(content);
      });

    //
  };

  const handleClearChats = async () => {
    await toast.promise(clearConversation(), {
      loading: "Clearing all conversations...",
      success: (res) => {
        setChatMessages([]);
        return res.message;
      },
      error: (err) => {
        return err.message;
      },
    });
  };

  useEffect(() => {
    if (!isUserLoggedIn) {
      return navigate("/login");
    }
  }, []);

  useLayoutEffect(() => {
    const fetchChats = async () => {
      if (!isFetching && isUserLoggedIn && currentUser) {
        const chats = await getUserChats();
        console.log(chats);
        setChatMessages([...chats]);
      }
    };
    fetchChats();
  }, []);

  // scroll to bottom of chat
  useEffect(() => {
    const chat = document.querySelector("#chat-box");
    chat.scrollTo(0, chat.scrollHeight);
  }, [chatMessages]);

  const handleNewChat = () => {
    toast.error("Due to API limitations, this feature is disabled.");
  };

  const handleLogout = () => {
    toast.promise(logout(), {
      loading: "Logging out...",
      success: (res) => {
        navigate("/");
        return res.message;
      },
      error: (err) => {
        return err.message || "Something went wrong";
      },
    });
  };

  const handleNav = (isToClose) => {
    if (isToClose) {
      navRef.current.classList.remove("-translate-x-full");
      navRef.current.classList.add("translate-x-0");
    } else {
      navRef.current.classList.add("-translate-x-full");
      navRef.current.classList.remove("translate-x-0");
    }
  };

  return (
    <>
      <div
        className="flex antialiased text-gray-800"
        style={{ height: "100dvh" }}
      >
        <div className="flex flex-row w-full h-full overflow-x-hidden">
          <div
            ref={navRef}
            className="flex-col flex-shrink-0 w-64 p-2 ms:py-8 md:pl-6 md:pr-2 bg-white fixed z-50 h-full md:static transition-all -translate-x-full md:translate-x-0 flex justify-between"
          >
            <RxCross1
              onClick={() => {
                handleNav(false);
              }}
              className="w-6 h-6 text-red-500 cursor-pointer md:hidden fixed top-4 right-4"
            />

            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-start md:justify-center w-full h-12">
                <div className="flex items-center justify-center w-10 h-10 text-indigo-700 bg-indigo-100 rounded-2xl">
                  <IoChatboxEllipsesOutline className="w-6 h-6" />
                </div>
                <div className="ml-2 text-2xl font-bold">All Chats</div>
              </div>
              <div className="mt-8">
                <div className="flex flex-row items-center justify-between text-xs">
                  <span className="font-bold">Active Conversations</span>
                  <span
                    onClick={handleNewChat}
                    className="flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full cursor-pointer"
                  >
                    <FaPlus className="w-4 h-4" />
                  </span>
                </div>
                <div className="flex flex-col h-48 mt-4 -mx-2 space-y-1 overflow-y-auto">
                  {chatMessages.length > 0 ? (
                    <button className="flex flex-row items-center p-2 bg-gray-100 rounded-xl">
                      <div className="ml-2 text-sm font-semibold truncate ">
                        New Chat:
                        <span className="font-medium">
                          {" "}
                          {chatMessages[0].content}
                        </span>
                      </div>
                    </button>
                  ) : (
                    <button className="flex flex-row items-center p-2 bg-gray-100 rounded-xl">
                      <div className="ml-2 text-sm truncate ">
                        You have no active conversations
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-row items-center justify-between mt-6 text-xs">
                <span className="font-bold">Settings</span>
              </div>
              <div className="flex flex-col mt-4 -mx-2 space-y-1">
                <button
                  onClick={handleClearChats}
                  className="flex flex-row items-center p-2 hover:bg-gray-100 rounded-xl"
                >
                  <MdOutlineDelete className="w-5 h-5" />
                  <div className="ml-2 text-sm">Clear conversations</div>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex flex-row items-center p-2 hover:bg-gray-100 rounded-xl"
                >
                  <IoIosLogOut className="w-5 h-5" />
                  <div className="ml-2 text-sm">Logout</div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full p-2 md:p-6 w-full">
            <div className="flex flex-col flex-auto flex-shrink-0 h-full bg-gray-100 rounded-2xl">
              <div
                className="relative flex flex-col h-full mb-4 overflow-x-auto "
                id="chat-box"
              >
                <span className="fixed px-4 py-2 top-6 left-6 rounded-xl z-40">
                  <GiHamburgerMenu
                    onClick={() => {
                      handleNav(true);
                    }}
                    className="w-6 h-6 md:hidden"
                  />
                </span>
                <span className="fixed px-4 py-2 z-40 bg-yellow-100 top-6 right-6 rounded-xl text-sm sm:text-base">
                  Credits: {userCredits}
                </span>
                <div className="flex flex-col h-full">
                  <div className="flex flex-col items-center gap-2">
                    <h1 className="text-lg sm:text-xl font-semibold text-center">
                      BumbleBee 1.0
                    </h1>
                    <p className="px-4 py-2 mt-6 text-xs sm:text-sm text-center bg-red-200 w-full md:w-max rounded-xl break-words">
                      Due to API limitations, you can send only 10 messages per
                      day.
                    </p>
                  </div>

                  {chatMessages.length > 0 ? (
                    <div
                      id="all-chats"
                      className="grid grid-cols-12 md:gap-y-2"
                    >
                      {chatMessages.length > 0 &&
                        chatMessages?.map((msg) => {
                          if (msg.role === "user") {
                            return (
                              <UserChatMessage
                                key={msg._id}
                                name={currentUser.name}
                                message={msg.content}
                              />
                            );
                          } else {
                            return (
                              <BumblebeeChatMessage
                                key={msg._id}
                                message={msg.content}
                              />
                            );
                          }
                        })}
                      {isChatSending && <BumbleBeeIsTyping />}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                      <p className="px-4 py-2 text-sm text-center w-max rounded-xl">
                        You have no active conversations.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="flex flex-row items-center w-full h-16 px-4 bg-white rounded-xl"> */}
              <div className="flex-grow bg-white rounded-xl">
                <div className="relative w-full">
                  <input
                    autoCapitalize="sentences"
                    autoFocus
                    type="text"
                    placeholder="Send a message..."
                    onChange={(e) => setFormData(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.shiftKey) {
                        //add new line
                        setFormData((prev) => prev + "\n");
                      } else if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                    value={formData}
                    className="flex w-full h-10 pl-4 border rounded-xl focus:outline-none focus:border-indigo-300"
                  />
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="absolute top-0 right-0 flex items-center justify-center w-12 h-full text-gray-400 hover:text-gray-600"
                  >
                    {isChatSending ? (
                      <ReactLoading
                        type="spin"
                        color="#000"
                        height={24}
                        width={24}
                      />
                    ) : (
                      <VscSend className="w-6 h-6" />
                    )}
                  </button>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;

const UserAvatar = ({ name }) => {
  return (
    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full">
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

const UserChatMessage = ({ name, message }) => {
  return (
    <div className="col-start-2 md:col-start-6 col-end-13 p-3 pl-0 pr-0 md:pl3 md:pr-3 rounded-lg">
      <div className="flex flex-row-reverse items-center justify-start">
        <UserAvatar name={name} />
        <div className="relative px-4 py-2 mr-3 text-sm bg-indigo-100 shadow chat-content rounded-xl">
          <div className="prose-sm">
            <Markdown>{message}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

const BumblebeeChatMessage = ({ message }) => {
  return (
    <div className="col-start-1 col-end-12 md:col-end-8 p-3 pl-0 pr-0 md:pl3 md:pr-3 rounded-lg ">
      <div className="flex flex-row items-center">
        <img
          src={pp}
          alt=""
          className="flex flex-col items-center self-start justify-center flex-shrink-0 w-10 h-10 mt-2 bg-indigo-500 rounded-full"
        />
        <div className="relative px-4 py-2 ml-3 text-sm bg-white shadow rounded-xl">
          <div className="prose-sm">
            <Markdown>{message}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

const BumbleBeeIsTyping = () => {
  return (
    <div className="col-start-1 col-end-12 md:col-end-8 p-3 pl-0 pr-0 md:pl3 md:pr-3 rounded-lg">
      <div className="flex flex-row items-center">
        <img
          src={pp}
          alt=""
          className="flex items-center self-start justify-center flex-shrink-0 w-10 h-10 mt-2 bg-indigo-500 rounded-full"
        />
        <div className="relative px-4 ml-3 text-sm bg-white shadow rounded-xl">
          <div>
            <ReactLoading type="bubbles" color="#000" height={40} width={40} />
          </div>
        </div>
      </div>
    </div>
  );
};
