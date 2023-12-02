import React, { useEffect, useLayoutEffect, useState } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import pp from "../images/favicon.png";
import { VscSend } from "react-icons/vsc";
import {
  clearConversation,
  getUserChats,
  sendChatRequest,
} from "../helpers/chats";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import ReactLoading from "react-loading";

const Chats = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn, currentUser, isFetching } = useAuthContext();
  const [isChatSending, setIsChatSending] = useState(false); //for disabling the send button
  const [formData, setFormData] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleSubmit = async () => {
    isChatSending && toast.error("Please wait before sending another message!");
    setIsChatSending(true);
    const content = formData;
    const newMessage = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    sendChatRequest(content)
      .then((res) => {
        console.log(res);
        setChatMessages((prev) => [...prev, res.data]);
        setFormData("");
        setIsChatSending(false);
      })
      .catch((err) => {
        toast.error(err.message || "Something went wrong");
        //select the last child of id all-chats and make the bg red of its child having class chat-content
        const lastChild = document.querySelector("#all-chats").lastChild;
        lastChild.querySelector(".chat-content").classList.add("bg-red-200");
        setIsChatSending(false);
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
  }, []); //

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
    const chat = document.querySelector("#all-chats");
    chat.scrollTo(0, chat.scrollHeight);
  }, [chatMessages]);

  const handleNewChat = () => {
    toast.error("Due to API limitations, this feature is disabled.");
  };

  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row w-full h-full overflow-x-hidden">
          <div className="flex flex-col flex-shrink-0 w-64 py-8 pl-6 pr-2 bg-white">
            <div className="flex flex-row items-center justify-center w-full h-12">
              <div className="flex items-center justify-center w-10 h-10 text-indigo-700 bg-indigo-100 rounded-2xl">
                <IoChatboxEllipsesOutline className="w-6 h-6" />
              </div>
              <div className="ml-2 text-2xl font-bold">All Chats</div>
            </div>
            <div className="flex flex-col justify-between h-full mt-8">
              <div>
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
                  <button className="flex flex-row items-center p-2 hover:bg-gray-100 rounded-xl">
                    <IoIosLogOut className="w-5 h-5" />
                    <div className="ml-2 text-sm">Logout</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 h-full p-4 bg-gray-100 rounded-2xl">
              <div className="flex flex-col h-full mb-4 overflow-x-auto">
                <div className="flex flex-col h-full">
                  <div className="flex flex-col items-center gap-2">
                    <h1 className="text-2xl font-semibold text-center">
                      BumbleBee 1.0
                    </h1>
                    <p className="px-4 py-2 text-sm text-center bg-red-200 w-max rounded-xl">
                      Due to API limitations, you can send only 10 messages per
                      day.
                    </p>
                  </div>

                  <div id="all-chats" className="grid grid-cols-12 gap-y-2">
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
                  </div>
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
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex flex-row-reverse items-center justify-start">
        <UserAvatar name={name} />
        <div className="relative px-4 py-2 mr-3 text-sm bg-indigo-100 shadow chat-content rounded-xl">
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};

const BumblebeeChatMessage = ({ message }) => {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <img
          src={pp}
          alt=""
          className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full"
        />
        <div className="relative px-4 py-2 ml-3 text-sm bg-white shadow rounded-xl">
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};
