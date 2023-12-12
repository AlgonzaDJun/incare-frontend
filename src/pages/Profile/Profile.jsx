import DefaultAvatar from "../../assets/defautl.webp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useState } from "react";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { getProfilUser } from "../../redux/reducers/userReducers";
import axios from "axios";
import SidebarKonselor from "../../components/SidebarKonselor";
export default function Profile() {
  const dispatch = useDispatch();
  const [isUpdate, setIsUpdate] = useState(false);
  const { profile } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getProfilUser());
  }, [dispatch]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSave = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("profile", selectedFile);
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
      dispatch(getProfilUser());
    }
    setIsUpdate(false);
    setSelectedFile(null);
  };

  return (
    <>
      <SidebarKonselor>
        <div className="flex flex-col items-center w-[1000px] ">
          {profile.user_id ? (
            <div className="w-3/4 ">
              <div className="w-[300px] h-[300px] mx-auto mb-5">
                {profile.user_id.image_url ? (
                  <>
                    <img
                      src={`https://ik.imagekit.io/5dphfg/${profile.user_id.image_url}`}
                      alt=""
                      style={{ borderRadius: "100%" }}
                      className="inline-block w-full h-full"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={DefaultAvatar}
                      className="inline-block w-full h-full"
                    />
                  </>
                )}
              </div>
              <div className="w-full">
                <div className="flex gap-3 w-full ">
                  <div className="w-1/3">
                    <div className="mb-2 block">
                      <Label htmlFor="fullname" value="Fullname" />
                    </div>
                    <TextInput
                      id="fullname"
                      value={profile.user_id.fullname}
                      type="text"
                      disabled={true}
                      required
                    />
                  </div>
                  <div className="w-1/3">
                    <div className="mb-2 block">
                      <Label htmlFor="username" value="Username" />
                    </div>
                    <TextInput
                      id="username"
                      value={profile.user_id.username}
                      type="text"
                      disabled={true}
                      required
                    />
                  </div>
                  <div className="w-1/3">
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="email" />
                    </div>
                    <TextInput
                      id="email"
                      value={profile.user_id.email}
                      type="text"
                      disabled={true}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-5 w-full">
                  <div className="w-1/3">
                    <div className="mb-2 block">
                      <Label htmlFor="no_hp" value="No Hp" />
                    </div>
                    <TextInput
                      id="no_hp"
                      value={profile.user_id.no_hp}
                      type="text"
                      disabled={true}
                      required
                    />
                  </div>
                  <div className="w-1/3">
                    <div className="mb-2 block">
                      <Label htmlFor="spesialisasi" value="Spesialisasi" />
                    </div>
                    <TextInput
                      id="spesialisasi"
                      value={profile.spesialisasi}
                      type="text"
                      disabled={true}
                      required
                    />
                  </div>
                  <div className="w-1/3">
                    <div className="mb-2 block">
                      <Label htmlFor="price" value="Price" />
                    </div>
                    <TextInput
                      id="price"
                      value={profile.price}
                      type="text"
                      disabled={true}
                      required
                    />
                  </div>
                </div>
                <FileInput
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-3 mb-5"
                  style={{ display: isUpdate ? "block" : "none" }}
                />
                {isUpdate ? (
                  <Button
                    onClick={handleSave}
                    className="w-1/4 mx-auto"
                    type="submit"
                  >
                    Save
                  </Button>
                ) : null}

                {isUpdate ? null : (
                  <Button
                    type="text"
                    className="w-1/4 mx-auto"
                    onClick={() => setIsUpdate(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          ) : null}

          <br />
          {/* <hr className="w-full" />
          <div className="w-[1000px] mt-8 ml-12">
            <StoryList profile={true} />
          </div> */}
        </div>
      </SidebarKonselor>
    </>
  );
}
