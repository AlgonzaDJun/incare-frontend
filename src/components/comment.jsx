import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineModeComment,
} from "react-icons/md";
import { stories } from "../redux/slice/story-slice";

const Comment = ({ isOpen, onClose, id }) => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();
  const data = useSelector((state) => state.getStory.data);

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(stories({ token, id }));
  }, [dispatch, id]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await dispatch(addComment({ token, data: value, id }));
  //   dispatch(stories({ token, id }));
  // };
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-start pt-20 justify-center"
    : "hidden";

  return (
    <div className={`${modalClasses} z-10`}>
      <div className="absolute inset-0  bg-black opacity-5"></div>
      <div className="bg-white p-6 rounded-lg z-20 w-5/12">
        <div>
          <span>Postingan {data.user}</span>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Close
          </button>
        </div>
        <h1 className="text-xl font-bold mb-4 font-nunito">{data.user}</h1>
        <p>{data.content}</p>
        <hr />
        <div className="flex gap-5 mt-1 mb-1">
          <button className="font-nunito">
            {data.isLike ? (
              <MdOutlineFavorite className="inline-block w-6 h-6 mr-1 text-red-600" />
            ) : (
              <MdFavoriteBorder className="inline-block w-6 h-6 text-[#607080] mr-1" />
            )}
          </button>

          <button onClick="">
            <MdOutlineModeComment className="inline-block w-6 h-6 text-[#607080] mr-1" />
          </button>
        </div>
        <hr />
        <div>
          {/* {data.comments.map((comment) => (
            <div key={comment._id} className="bg-gray-100 rounded-xl p-2 my-2">
              <h2 className="font-nunito font-bold text-base"></h2>
              <p className="text-sm font-nunito"></p>
            </div>
          ))} */}
        </div>
        <div>
          <form onSubmit="">
            <input
              onChange={handleChange}
              value={value}
              type="text"
              className="rounded outline-0"
            />
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Comment;

Comment.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  id: PropTypes.string,
};
