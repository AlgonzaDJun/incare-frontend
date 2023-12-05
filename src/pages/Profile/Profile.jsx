import SidebarSecond from "../../components/SidebarSecond";
import Doctor from "../../assets/male_doktor1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useState } from "react";
import { Button, Modal, Checkbox, Label, TextInput } from "flowbite-react";
import { getProfilUser } from "../../redux/reducers/userReducers";
import StoryList from "../../components/storyList";
export default function Profile() {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    dispatch(getProfilUser());
  }, [dispatch]);

  return (
    <>
      <SidebarSecond>
        <div className="flex flex-col items-center w-[1000px] mt-7">
          {profile.user_id ? (
            <div className="flex  gap-10 flex-row justify-end items-center ">
              <div>
                <img
                  src={Doctor}
                  alt=""
                  style={{ borderRadius: "100%" }}
                  className="inline-block w-[200px] h-[200px]"
                />
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
                    <div className="space-y-6">
                      <form className="flex max-w-md flex-col gap-4">
                        <div>
                          <div className="mb-2 block">
                            <Label htmlFor="email1" value="Fullname" />
                          </div>
                          <TextInput
                            id="email1"
                            type="email"
                            placeholder="name@flowbite.com"
                            required
                          />
                        </div>
                        <div>
                          <div className="mb-2 block">
                            <Label htmlFor="password1" value="Bio" />
                          </div>
                          <TextInput id="password1" type="password" required />
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="remember" />
                          <Label htmlFor="remember">Remember me</Label>
                        </div>
                      </form>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>Save</Button>
                    <Button>Lupa Password</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                      Decline
                    </Button>
                  </Modal.Footer>
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
