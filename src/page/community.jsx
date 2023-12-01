import SidebarSecond from "../components/SidebarSecond";
import Newpost from "../components/newpost";
import StoryList from "../components/storyList";

export default function Community() {
  return (
    <>
      <SidebarSecond>
        <div className=" pl-10 flex-grow  overflow-y-scroll max-h-screen w-[1000px]">
          <h1 className="font-nunito mt-8 mb-3 text-2xl font-semibold">
            Mari Berbagi Cerita Dengan Lainnya
          </h1>
          <Newpost />
          <StoryList />
        </div>
      </SidebarSecond>
    </>
  );
}
