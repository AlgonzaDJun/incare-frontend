import SidebarSecond from "../../components/SidebarSecond";
import FaqAccordion from "../../components/accordion";

export default function Faq() {
  return (
    <>
      <SidebarSecond>
        <h1 className="font-nunito text-[#2E4185] font-bold text-3xl">FAQ</h1>
        <FaqAccordion />
      </SidebarSecond>
    </>
  );
}
