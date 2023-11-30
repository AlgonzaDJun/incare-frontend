import Newpost from "../components/newpost";
import StoryList from "../components/storyList";

export default function Community() {
  return (
    <>
      <div className="bg-netral-bluesky w-full h-full pl-14">
        <h1 className="font-nunito mt-8 mb-3 text-2xl font-semibold">
          Mari Berbagi Cerita Dengan Lainnya
        </h1>
        <Newpost />
        <StoryList />
      </div>
    </>
  );
}
