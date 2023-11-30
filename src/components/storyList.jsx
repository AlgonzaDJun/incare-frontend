import { useDispatch, useSelector } from "react-redux";
import Story from "./story";
import { useEffect, useState } from "react";
import { getAllStories } from "../redux/slice/all-stories-slice";
import Comment from "./comment";

export default function StoryList() {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedStoryId, setSelectedStoryId] = useState(null);

  const handleStoryClick = (id) => {
    setSelectedStoryId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const data = useSelector((state) => state.getStories.data);
  const status = useSelector((state) => state.getStories.status);
  const error = useSelector((state) => state.getStories.error);
  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getAllStories({ token }));
  }, []);
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  console.log(data);
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="">
        {data.map((item) => (
          <Story
            key={item._id}
            id={item._id}
            isLike={item.isLike}
            username={item.user.username}
            content={item.content}
            likes={item.likes}
            comments={item.comments}
            openModal={handleStoryClick}
          />
        ))}
        <Comment
          id={selectedStoryId}
          isOpen={modalIsOpen}
          onClose={closeModal}
        ></Comment>
      </div>
    </>
  );
}
