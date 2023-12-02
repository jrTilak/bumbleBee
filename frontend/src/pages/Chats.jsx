import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import pp from "../images/favicon.png";

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
  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row w-full h-full overflow-x-hidden">
          <div className="flex flex-col flex-shrink-0 w-64 py-8 pl-6 pr-2 bg-white">
            <div className="flex flex-row items-center justify-center w-full h-12">
              <div className="flex items-center justify-center w-10 h-10 text-indigo-700 bg-indigo-100 rounded-2xl">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <div className="ml-2 text-2xl font-bold">All Chats</div>
            </div>
            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span className="flex items-center justify-center w-4 h-4 bg-gray-300 rounded-full">
                  4
                </span>
              </div>
              <div className="flex flex-col h-48 mt-4 -mx-2 space-y-1 overflow-y-auto">
                <button className="flex flex-row items-center p-2 hover:bg-gray-100 rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 bg-indigo-200 rounded-full">
                    H
                  </div>
                  <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
                </button>
                <button className="flex flex-row items-center p-2 hover:bg-gray-100 rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                    M
                  </div>
                  <div className="ml-2 text-sm font-semibold">Marta Curtis</div>
                  <div className="flex items-center justify-center w-4 h-4 ml-auto text-xs leading-none text-white bg-red-500 rounded">
                    2
                  </div>
                </button>
                <button className="flex flex-row items-center p-2 hover:bg-gray-100 rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-200 rounded-full">
                    P
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    Philip Tucker
                  </div>
                </button>
                <button className="flex flex-row items-center p-2 hover:bg-gray-100 rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 bg-pink-200 rounded-full">
                    C
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    Christine Reid
                  </div>
                </button>
                <button className="flex flex-row items-center p-2 hover:bg-gray-100 rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-200 rounded-full">
                    J
                  </div>
                  <div className="ml-2 text-sm font-semibold">Jerry Guzman</div>
                </button>
              </div>
              <div className="flex flex-row items-center justify-between mt-6 text-xs">
                <span className="font-bold">Archivied</span>
                <span className="flex items-center justify-center w-4 h-4 bg-gray-300 rounded-full">
                  7
                </span>
              </div>
              <div className="flex flex-col mt-4 -mx-2 space-y-1">
                <button className="flex flex-row items-center p-2 hover:bg-gray-100 rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 bg-indigo-200 rounded-full">
                    H
                  </div>
                  <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 h-full p-4 bg-gray-100 rounded-2xl">
              <div className="flex flex-col h-full mb-4 overflow-x-auto">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    <BumblebeeChatMessage message="Hello, how are you?" />
                    <UserChatMessage name="Henry Boyd" message="I'm fine!" />
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-row items-center w-full h-16 px-4 bg-white rounded-xl"> */}
                <div className="flex-grow bg-white rounded-xl">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="flex w-full h-10 pl-4 border rounded-xl focus:outline-none focus:border-indigo-300"
                    />
                    <button className="absolute top-0 right-0 flex items-center justify-center w-12 h-full text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
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
        <div className="relative px-4 py-2 mr-3 text-sm bg-indigo-100 shadow rounded-xl">
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
