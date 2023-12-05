import PropTypes from "prop-types";

import {
  MdFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineModeComment,
} from "react-icons/md";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";

import {
  deleteStory,
  getStories,
  updateLike,
} from "../redux/reducers/storyReducer";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Story({
  id,
  username,
  content,
  likes,
  isLike,
  comments,
  onCardClick,
  // eslint-disable-next-line react/prop-types
  profile,
}) {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleClick = async () => {
    await dispatch(updateLike(id));
    dispatch(getStories());
  };
  const handleDelete = async () => {
    await dispatch(deleteStory(id));
    dispatch(getStories());
  };
  return (
    <>
      <div className="max-w-4xl mb-5 p-6 relative  bg-netral-bluesky  border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
        <button
          onClick={() => setOpenModal(true)}
          className={profile ? "absolute top-7 right-7" : "hidden"}
        >
          <FaRegTrashAlt className="w-5 h-5 text-primary-blue " />
        </button>
        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this Story?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={() => {
                    handleDelete();
                    setOpenModal(false);
                  }}
                >
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
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
          <button onClick={() => onCardClick(id)}>
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
  onCardClick: PropTypes.func,
};
