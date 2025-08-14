"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import {
  MdDashboard,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdHome,
  MdInfoOutline,
  MdOutlineMic,
  MdOutlineContactPage,
  MdEventNote,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { Repeat2, ImageDown } from "lucide-react";
import { usePathname } from "next/navigation";

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
        title: "Registrations",
        path: "/dashboard/registrations/2026",
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

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="fixed left-0  w-64 border-r bg-white z-10">
      <div className="p-4 flex items-center justify-center">
        <Image src={"/home/logo.png"} alt="logo" width={100} height={100} />
      </div>
      <SidebarContent className="h-[calc(100%-80px)] overflow-y-auto">
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.list.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.path}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                            isActive
                              ? "bg-blue-500 text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
