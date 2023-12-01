import { useDispatch, useSelector } from "react-redux";
import Story from "./story";
import { useEffect, useState } from "react";
import { getAllStories } from "../redux/slice/all-stories-slice";
import Modal from "./modal";
export default function StoryList() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const data = useSelector((state) => state.getStories.data);
  const status = useSelector((state) => state.getStories.status);
  const error = useSelector((state) => state.getStories.error);
  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getAllStories({ token }));
  }, [dispatch]);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  const handleCardClick = (id) => {
    setSelectedCardId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
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
            likes={item.likes.length}
            comments={item.comments.length}
            onCardClick={handleCardClick}
          />
        ))}
        <Modal id={selectedCardId} isOpen={modalOpen} onClose={closeModal} />
      </div>
    </>
  );
}
