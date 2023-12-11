import { useState } from "react";
import { MdSend } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { getStories, postStory } from "../redux/reducers/storyReducer";
export default function NewPost() {
  const [value, setValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(postStory(value));
    setValue("");
    setOpenModal(false);
    dispatch(getStories());
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
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className=" inline-block"
            >
              <MdSend className="w-8 h-8 text-incare-primary" />
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
                    Are you sure you want to post this story?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button color="success" onClick={handleSubmit}>
                      {"Yes, I'm sure"}
                    </Button>
                    <Button
                      color="gray"
                      type="button"
                      onClick={() => setOpenModal(false)}
                    >
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </form>
      </div>
    </>
  );
}
