/* eslint-disable react/prop-types */
import React from "react";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import {
  MdDateRange,
  MdHome,
  MdLogout,
  MdPerson,
  MdPhotoCamera,
  MdQuestionAnswer,
} from "react-icons/md";
import { RiQuestionFill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { FiMessageSquare, FiUserPlus } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const SidebarSecond = ({ children }) => {
  const location = useLocation().pathname;

  // console.log(location.pathname)

  const menus = [
    { name: "Home", link: "/", icon: MdHome },
    { name: "Konseling", link: "/booking", icon: MdDateRange },
    { name: "Pertemuan", link: "/history", icon: MdPhotoCamera },
    { name: "Chat", link: "#", icon: FiMessageSquare },
    {
      name: "Ceritaku",
      link: "/community",
      icon: MdQuestionAnswer,
      margin: true,
    },
    { name: "Quiz Incare", link: "#", icon: TbReportAnalytics },
    { name: "Profile", link: "#", icon: MdPerson },
    { name: "Daftar Konselor", link: "#", icon: FiUserPlus, margin: true },
    { name: "FAQ", link: "/faq", icon: RiQuestionFill },
    // logout
    { name: "Logout", link: "/", icon: MdLogout, margin: true },
  ];

  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`border-r border-r-incare-primary min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-incare-primary px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-incare-darker ${
                location == (menu.link || menu.link + "/") &&
                "bg-incare-darker text-white"
              } hover:text-white rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={
                  {
                    //   transitionDelay: `${i + 3}00ms`,
                  }
                }
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-incare-primary rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      {/* <div className="m-3 text-xl text-gray-900 font-semibold">
        REACT TAILWIND
      </div> */}

      <div>{children}</div>
    </section>
  );
};

export default SidebarSecond;
