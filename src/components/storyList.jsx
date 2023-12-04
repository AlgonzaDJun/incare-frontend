import { useDispatch, useSelector } from "react-redux";
import Story from "./story";
import { useEffect, useState } from "react";
import Modal from "./ModalComment";
import { getStories } from "../redux/reducers/storyReducer";
import { Spinner } from "flowbite-react";
export default function StoryList() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const { stories, loading, error } = useSelector((state) => state.story);

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);
  if (loading === true) {
    return (
      <div className="text-center">
        <Spinner className="mx-auto" aria-label="Loading Get Story List" />
      </div>
    );
  }

  if (loading === false && error !== null) {
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
        {stories.map((item) => (
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
