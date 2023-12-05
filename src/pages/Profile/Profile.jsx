import SidebarSecond from "../../components/SidebarSecond";
import DefaultAvatar from "../../assets/defautl.webp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useState } from "react";
import { Button, Modal, Label, TextInput, FileInput } from "flowbite-react";
import { getProfilUser } from "../../redux/reducers/userReducers";
import StoryList from "../../components/storyList";
import axios from "axios";
export default function Profile() {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    dispatch(getProfilUser());
  }, [dispatch]);
  const [bio, setBio] = useState();
  const [fullname, setFullname] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleBioValue = (e) => {
    setBio(e.target.value);
  };
  const handleFullnameValue = (e) => {
    setFullname(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile", selectedFile);
    formData.append("bio", bio);
    formData.append("fullname", fullname);
    const token = localStorage.getItem("token");
    await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/users/profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setOpenModal(false);
    dispatch(getProfilUser());
  };

  return (
    <>
      <SidebarSecond>
        <div className="flex flex-col items-center w-[1000px] mt-7">
          {profile.user_id ? (
            <div className="flex  gap-10 flex-row justify-end items-center ">
              <div>
                {profile.user_id.image_url ? (
                  <img
                    src={`https://ik.imagekit.io/5dphfg/${profile.user_id.image_url}`}
                    alt=""
                    style={{ borderRadius: "100%" }}
                    className="inline-block w-[200px] h-[200px]"
                  />
                ) : (
                  <img
                    src={DefaultAvatar}
                    className="inline-block w-[200px] h-[200px]"
                  />
                )}
              </div>
              <div>
                <h1 className="font-nunito font-semibold text-xl">
                  {profile.user_id.username}
                </h1>
                <h2 className="font-nunito mb-4 text-base text-slate-400">
                  {profile.user_id.fullname}
                </h2>

                <h3 className="font-nunito text-sm  font-semibold ">
                  Spesialisasi {profile.spesialisasi}
                </h3>
                <h3 className="font-nunito mb-2  text-sm font-semibold ">
                  Rp {profile.price} Perjam
                </h3>
                <h4 className="font-nunito mb-2 text-sm text-slate-600">
                  {profile.user_id.bio}
                </h4>
                <button
                  onClick={() => setOpenModal(true)}
                  className="bg-incare-primary text-xs text-netral-white p-2 rounded"
                >
                  Edit Profile
                </button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                  <Modal.Header>Edit Profile</Modal.Header>
                  <Modal.Body>
                    <form
                      className="flex max-w-md flex-col gap-4"
                      onSubmit={handleSubmit}
                    >
                      <div className="space-y-6">
                        <div>
                          <div className="mb-2 block">
                            <Label htmlFor="email1" value="Fullname" />
                          </div>
                          <TextInput
                            id="email1"
                            type="text"
                            value={fullname}
                            onChange={handleFullnameValue}
                            required
                          />
                        </div>
                        <div>
                          <div className="mb-2 block">
                            <Label htmlFor="password1" value="Bio" />
                          </div>
                          <TextInput
                            id="password1"
                            value={bio}
                            onChange={handleBioValue}
                            type="text"
                            required
                          />
                        </div>
                        <div>
                          <div className="mb-2 block">
                            <Label htmlFor="profile" value="Bio" />
                          </div>
                          <FileInput
                            onChange={handleFileChange}
                            id="profile"
                            type="file"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button type="submit">Save</Button>
                        <Button
                          color="gray"
                          onClick={() => setOpenModal(false)}
                        >
                          Decline
                        </Button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          ) : null}

          <br />
          <hr className="w-full" />
          <div className="w-[1000px] mt-8 ml-12">
            <StoryList profile={true} />
          </div>
        </div>
      </SidebarSecond>
    </>
  );
}
