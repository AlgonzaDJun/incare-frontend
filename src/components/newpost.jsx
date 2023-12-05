import { useState } from "react";
import { MdSend } from "react-icons/md";
import { useDispatch } from "react-redux";
import { getStories, postStory } from "../redux/reducers/storyReducer";
export default function NewPost() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(postStory(value));
    dispatch(getStories());
    setValue("");
  };
  return (
    <>
      <div className="p-5 max-w-4xl mb-7 bg-netral-bluesky rounded text ">
        <form onSubmit={handleSubmit}>
          <div className=" flex">
            <input
              type="text"
              value={value}
              onChange={handleChange}
              id="post"
              className="inline-block bg-gray-200 mr-3 border-0  outline-0 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ketik disini"
              required
            />
            <button type="" className=" inline-block">
              <MdSend className="w-8 h-8 text-incare-primary" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
