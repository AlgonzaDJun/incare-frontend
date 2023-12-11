import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { BsFillSendFill } from "react-icons/bs";

import axios from "axios";
import {
  MdFavoriteBorder,
  MdOutlineClose,
  MdOutlineFavorite,
  MdOutlineModeComment,
} from "react-icons/md";
import { Spinner } from "flowbite-react";
import {
  addComment,
  getStories,
  updateLike,
} from "../redux/reducers/storyReducer";
// eslint-disable-next-line react/prop-types
export default function Modal({ isOpen, onClose, id }) {
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(null);
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const fetchDetail = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/stories/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setDetail(response.data.data);
  };
  useEffect(() => {
    // Panggil API getDetail ketika modal dibuka

    if (isOpen && id) {
      fetchDetail();
    }
  }, [isOpen, id]);
  const handleLikeClick = async () => {
    await dispatch(updateLike(id));
    dispatch(getStories());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addComment(value, id));
    setValue("");
    await fetchDetail();
  };
  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded w-[500px] relative">
        {detail ? (
          <>
            <h2 className=" text-2xl text-center font-bold mb-7">
              Cerita Dari {detail.user.username}
            </h2>
            <button
              className="absolute top-2 right-4  text-white  rounded mt-4 hover:bg-red-700 focus:outline-none focus:shadow-outline-red active:bg-red-800"
              onClick={onClose}
            >
              <MdOutlineClose className="text-black w-5 h-5" />
            </button>

            <div className="bg-netral-bluesky rounded p-2">
              <h1 className="text-xl font-bold mb-1 font-nunito">
                {detail.user.username}
              </h1>
              <p>{detail.content}</p>
            </div>
            <div className="my-2">
              <hr />
              <div className="flex gap-5 my-2">
                <button onClick={handleLikeClick} className="font-nunito">
                  {detail.isLike ? (
                    <MdOutlineFavorite className="inline-block w-6 h-6 mr-1 text-red-600" />
                  ) : (
                    <MdFavoriteBorder className="inline-block w-6 h-6 text-[#607080] mr-1" />
                  )}{" "}
                  {detail.likes}
                </button>

                <button onClick="">
                  <MdOutlineModeComment className="inline-block w-6 h-6 text-[#607080] mr-1" />
                  {detail.comments.length}
                </button>
              </div>
              <hr />
            </div>

            <div className="max-h-[250px] overflow-y-auto">
              {detail.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-gray-100 rounded-xl p-2 my-2"
                >
                  <h2 className="font-nunito font-bold text-base">
                    {comment.user.username}
                  </h2>
                  <p className="text-sm font-nunito">{comment.comment}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-3">
              <form onSubmit={handleSubmit} className="w-full">
                <input
                  onChange={handleChange}
                  value={value}
                  type="text"
                  placeholder="Ketik Disini"
                  className="border-0 bg-gray-200 w-11/12 rounded outline-0 mr-2"
                />
                <button type="submit">
                  <BsFillSendFill className=" text-[#2E4185]" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="text-center">
            <Spinner className="mx-auto" aria-label="Loading Get Story List" />
          </div>
        )}
      </div>
    </div>
  ) : null;
}
