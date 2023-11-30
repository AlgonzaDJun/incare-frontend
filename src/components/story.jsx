import PropTypes from "prop-types";

import {
  MdFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineModeComment,
} from "react-icons/md";

import { useDispatch } from "react-redux";
import { updateLike } from "../redux/slice/update-like-slice";
import { getAllStories } from "../redux/slice/all-stories-slice";

export default function Story({
  id,
  username,
  content,
  likes,
  isLike,
  comments,
  openModal,
}) {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const token = localStorage.getItem("token");
    await dispatch(updateLike({ token, id }));
    dispatch(getAllStories({ token, id }));
  };

  return (
    <>
      <div className="max-w-4xl mb-5 p-6 bg-white  border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
        <h1 className="font-nunito text-xl text-[#607080] font-bold">
          {username}
        </h1>
        <p className="mt-1 font-nunito text-base text-[#607080]  dark:text-gray-400">
          {content}
        </p>
        <div className="flex gap-5 mt-10">
          <button className="font-nunito" onClick={handleClick}>
            {isLike ? (
              <MdOutlineFavorite className="inline-block w-6 h-6 mr-1 text-red-600" />
            ) : (
              <MdFavoriteBorder className="inline-block w-6 h-6 text-[#607080] mr-1" />
            )}

            {likes}
          </button>
          <button onClick={() => openModal(id)}>
            <MdOutlineModeComment className="inline-block w-6 h-6 text-[#607080] mr-1" />
            {comments}
          </button>
        </div>
      </div>
    </>
  );
}

Story.propTypes = {
  id: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  likes: PropTypes.number,
  totalComments: PropTypes.number,
  comments: PropTypes.array,
  isLike: PropTypes.bool,
  openModal: PropTypes.func,
};
