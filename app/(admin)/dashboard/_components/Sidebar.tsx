import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  MdDashboard,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
  MdHome,
  MdInfoOutline,
  MdOutlineMic,
  MdOutlineContactPage,
  MdEventNote,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import MenuLink from "./Menulink";
import { Colors } from "@/constant/colors";
import { GalleryHorizontal, ImageDown, Repeat2 } from "lucide-react";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Home",
        path: "/dashboard/home",
        icon: <MdHome />,
      },
      {
        title: "About",
        path: "/dashboard/about",
        icon: <MdInfoOutline />,
      },
      {
        title: "Events",
        path: "/dashboard/event",
        icon: <MdEventNote />,
      },
      {
        title: "Speakers",
        path: "/dashboard/speakers",
        icon: <MdOutlineMic />,
      },
      {
        title: "Sponsors",
        path: "/dashboard/sponsors",
        icon: <FaUsers />,
      },
      {
        title: "Exhibitors",
        path: "/dashboard/exhibitors",
        icon: <FaUsers />,
      },
      {
        title: "Attendee",
        path: "/dashboard/attendee",
        icon: <FaUsers />,
      },
      {
        title: "Summit",
        path: "/dashboard/summit",
        icon: <Repeat2 size={15} />,
      },
      {
        title: "Gallery",
        path: "/dashboard/gallery",
        icon: <ImageDown size={15} />,
      },
      {
        title: "Blogs",
        path: "/dashboard/blogs",
        icon: <MdEventNote />,
      },
      {
        title: "Contact",
        path: "/dashboard/contact",
        icon: <MdOutlineContactPage />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
      // {
      //   title: "Visitors",
      //   path: "/dashboard/visitors",
      //   icon: <MdPeople />,
      // },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

function Sidebar() {
  return (
    <div className="h-full w-full border-r sticky top-28">
      <div className="p-4 flex items-center justify-center">
        <Image src={"/home/logo.png"} alt="logo" width={100} height={100} />
      </div>
      {menuItems.map((cat) => (
        <ul
          key={cat.title}
          className="flex items-center  px-4 pt-2 text-purple-950 w-full"
        >
          <li className="font-bold text-lg">
            {cat.title}
            <span className="font-normal text-sm w-full">
              {cat.list.map((item) => (
                <MenuLink data={item} key={item.title} />
              ))}
            </span>
          </li>
          {/* <Link href={'/dashboard/home'}>{item.title}</Link> */}
        </ul>
      ))}
    </div>
  );
}

export default Sidebar;
