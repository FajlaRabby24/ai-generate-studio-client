import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
        },
        {
          title: "My Profile",
          href: `/my-profile`,
          icon: "User",
        },
        {
          title: "History",
          href: `/history`,
          icon: "History",
        },
        {
          title: "Billing",
          href: `/billing`,
          icon: "CreditCard",
        },
        {
          title: "Settings",
          href: `/settings`,
          icon: "Settings",
        },
      ],
    },
  ];
};

export const userNavItems: NavSection[] = [
  {
    title: "AI Generators",
    items: [
      {
        title: "Text to Image",
        href: "/dashboard/text-to-image",
        icon: "MdOutlineDraw",
      },
      {
        title: "AI Chatbot",
        href: "/dashboard/ai-chatbot",
        icon: "MdOutlineChat",
      },
      // {
      //   title: "Text to Video",
      //   href: "/dashboard/text-to-video",
      //   icon: "MdOutlineVideoLibrary",
      // },
      // {
      //   title: "Text to Speech",
      //   href: "/dashboard/text-to-speech",
      //   icon: "MdOutlineSurfing",
      // },
      // {
      //   title: "Image to Video",
      //   href: "/dashboard/image-to-video",
      //   icon: "MdOutlineVideoLibrary",
      // },
      // {
      //   title: "Remove Background",
      //   href: "/dashboard/remove-background",
      //   icon: "MdOutlineDeleteOutline",
      // },
    ],
  },
];
