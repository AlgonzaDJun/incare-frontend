import DefaultAvatar from "../../assets/defautl.webp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { getProfilUser } from "../../redux/reducers/userReducers";
// import StoryList from "../../components/storyList";
import axios from "axios";
import SidebarKonselor from "../../components/SidebarKonselor";
export default function Profile() {
  const dispatch = useDispatch();
  const [isUpdate, setIsUpdate] = useState(false);
  const { profile } = useSelector((state) => state.user);

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
    setIsUpdate(false);
    // const formData = new FormData();
    // formData.append("profile", selectedFile);
    // formData.append("bio", bio);
    // formData.append("fullname", fullname);
    // const token = localStorage.getItem("token");
    // await axios.put(
    //   `${import.meta.env.VITE_SERVER_URL}/users/profile`,
    //   formData,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // dispatch(getProfilUser());
    console.log(isUpdate);
  };

  return (
    <>
      <SidebarKonselor>
        <div className="flex flex-col items-center w-[1000px] mt-3">
          {profile.user_id ? (
            <div className="">
              <div>
                {profile.user_id.image_url ? (
                  <>
                    <label htmlFor="fileInput">
                      <img
                        src={`https://ik.imagekit.io/5dphfg/${profile.user_id.image_url}`}
                        alt=""
                        style={{ borderRadius: "100%" }}
                        className="inline-block w-[400px] h-[400px]"
                      />
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      onChange={handleFileChange}
                      // style={{ display }}
                    />
                  </>
                ) : (
                  <>
                    <label htmlFor="fileInput">
                      <img
                        src={DefaultAvatar}
                        className="inline-block w-[300px] h-[300px]"
                      />
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </>
                )}
              </div>
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full flex-col gap-4 mt-7"
                >
                  <div className="flex gap-5 w-full">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="fullname" value="Fullname" />
                      </div>
                      <TextInput
                        id="fullname"
                        value={profile.user_id.fullname}
                        type="text"
                        disabled={isUpdate ? false : true}
                        required
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="username" value="Username" />
                      </div>
                      <TextInput
                        id="username"
                        value={profile.user_id.username}
                        type="text"
                        disabled={isUpdate ? false : true}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-5 w-full">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="spesialisasi" value="Spesialisasi" />
                      </div>
                      <TextInput
                        id="spesialisasi"
                        value={profile.spesialisasi}
                        type="text"
                        disabled={isUpdate ? false : true}
                        required
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="price" value="Price" />
                      </div>
                      <TextInput
                        id="price"
                        value={profile.price}
                        type="text"
                        disabled={isUpdate ? false : true}
                        required
                      />
                    </div>
                  </div>
                  {isUpdate ? <Button type="submit">Save</Button> : null}
                </form>
                {isUpdate ? null : (
                  <Button type="text" onClick={() => setIsUpdate(true)}>
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
