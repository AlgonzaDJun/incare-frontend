/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// import React from 'react'

import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import SidebarSecond from "../../components/SidebarSecond";
import BubbleKonselor from "./BubbleKonselor";
import BubbleUser from "./BubbleUser";
import NamaKonselor from "./NamaKonselor";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatBySenderReceiver,
  handleSendMessage,
} from "../../redux/reducers/chatReducer";
import LoadingFullPage from "../../components/LoadingFullPage";
import {
  getAllBooking,
  getBookingById,
} from "../../redux/reducers/bookingReducer";
import { getKonselor } from "../../redux/reducers/konselorReducer";

const ChatPage = () => {
  const { idKonselor } = useParams();
  const userId = localStorage.getItem("userId");

  const [pesan, setPesan] = useState([]);
  const [isiChat, setIsiChat] = useState("");

  const chat = useSelector((state) => state.chat);
  const bookingData = useSelector((state) => state.booking);
  const { allBooking, isErrored, isFulfilled, isLoading } = bookingData;
  const konselor = useSelector((state) => state.konselor);
  const { konselor: dataKonselor } = konselor;

  const { messages } = chat;

  // console.log(allBooking.data);

  const chatNow =
    allBooking.data &&
    allBooking.data
      .filter((item) => {
        const currentTime = new Date();
        const conselingTime = new Date(item.tanggal_konseling);
        conselingTime.setHours(conselingTime.getHours() - 7);
        const conselingTimeOut = new Date(item.tanggal_konseling);
        conselingTimeOut.setHours(conselingTimeOut.getHours() - 6);

        if (currentTime >= conselingTime && item.status === "success") {
          return item;
        }
      })
      .map((item) => {
        const conselingTimeOut = new Date(item.tanggal_konseling);
        conselingTimeOut.setHours(conselingTimeOut.getHours() - 6);
        return { ...item, conselingTime: new Date() <= conselingTimeOut };
      });

  const handleKirimPesan = () => {
    const data = {
      sender_id: userId,
      receiver_id: idKonselor,
      message: isiChat,
    };
    // console.log(data)
    dispatch(handleSendMessage(data));
    setIsiChat("");
  };

  console.log(chatNow);

  // console.log(dataKonselor.counselors);

  // Ambil _id dari semua conselor yang ada di jadwal

  // conselorCocok akan berisi data objek konselor yang memiliki _id yang cocok dengan jadwal

  // console.log(chat)

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const pusher = new Pusher("c9ce2e95cbf7337b0b48", {
      cluster: "ap1",
    });

    const channel1 = pusher.subscribe(userId);

    channel1.bind("chat", (data) => {
      setPesan((old) => [
        ...old,
        {
          message: data.message,
          sender_id: data.sender_id,
          receiver_id: data.receiver_id,
        },
      ]);
      // console.log(data)
    });

    if (idKonselor) {
      dispatch(getChatBySenderReceiver(userId, idKonselor));
    }
    dispatch(getAllBooking(token));
    dispatch(getKonselor());

    console.log(pesan);
  }, []);

  const scrollRef = useRef(null);

  useEffect(() => {
    // Lakukan scroll ke bagian bawah saat pesan berubah
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [pesan]);

  return (
    <SidebarSecond>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <div className="ml-2 font-bold text-2xl">Chat Konselor</div>
            </div>

            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"></span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-72 overflow-y-auto">
                {/* <Link to={"/chat/6560731aeeb6528b4fbd8bb2"}>
                  <NamaKonselor nama={"Dr. Agus"} />
                </Link>
                <NamaKonselor nama={"Dr. Melati"} />
                <NamaKonselor nama={"Dr. Arjun"} /> */}

                {chatNow
                  ? chatNow.map((item, id) => {
                      return (
                        <Link to={`/chat/${item.conselor_id._id}`} key={id}>
                          <NamaKonselor
                            nama={item.conselor_id.user_id.fullname}
                          />
                        </Link>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
          {idKonselor ? (
            <div className="flex flex-col flex-auto h-full p-6">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2" ref={scrollRef}>
                      {messages.data
                        ? messages.data.message.map((item, id) => {
                            return item.sender === userId ? (
                              <BubbleUser key={id} pesan={item.content} />
                            ) : (
                              <BubbleKonselor key={id} pesan={item.content} />
                            );
                          })
                        : null}
                      {/* <BubbleKonselor pesan={"helo"} />
                      <BubbleUser pesan={"hi"} /> */}
                      {pesan.map((item, id) =>
                        item.sender_id === userId ? (
                          <BubbleUser key={id} pesan={item.message} />
                        ) : (
                          <BubbleKonselor key={id} pesan={item.message} />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                  {chatNow ? (
                    chatNow.filter((item) => {
                      return (
                        item.conselor_id._id === idKonselor &&
                        item.conselingTime == true
                      );
                    }) == false ? (
                      <div className="font-bold text-center mx-auto">waktu konseling habis</div>
                    ) : (
                      <>
                        <div>
                          <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                              ></path>
                            </svg>
                          </button>
                        </div>
                        <div className="flex-grow ml-4">
                          <div className="relative w-full">
                            <input
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleKirimPesan();
                                }
                              }}
                              value={isiChat}
                              onChange={(e) => setIsiChat(e.target.value)}
                              type="text"
                              className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                            />
                            <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="ml-4">
                          <button
                            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                            onClick={handleKirimPesan}
                          >
                            <span>Send</span>
                            <span className="ml-2">
                              <svg
                                className="w-4 h-4 transform rotate-45 -mt-px"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </>
                    )
                  ) : null}
                  {/* <div>
                    <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex-grow ml-4">
                    <div className="relative w-full">
                      <input
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleKirimPesan();
                          }
                        }}
                        value={isiChat}
                        onChange={(e) => setIsiChat(e.target.value)}
                        type="text"
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      />
                      <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                      onClick={handleKirimPesan}
                    >
                      <span>Send</span>
                      <span className="ml-2">
                        <svg
                          className="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-auto h-full p-6">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 w-96 justify-center items-center">
                silakan pilih room chat
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarSecond>
  );
};

export default ChatPage;
