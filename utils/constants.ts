import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  Settings,
} from "lucide-react";
export const MAX_FREE_COUNTS = 5;
export const toolsObjects = {
  conversation: {
    icon: MessageSquare,
    href: "/conversation",
    label: "Conversation",
    color: " text-violet-500 ",
    bgColor: " bg-violet-500/10 ",
  },
  code: {
    icon: Code,
    href: "/code",
    label: "Code Generation",
    color: " text-green-700 ",
    bgColor: " bg-green-700/10 ",
  },
  image: {
    icon: ImageIcon,
    href: "/image",
    label: "Image Generation",
    color: " text-pink-500 ",
    bgColor: " bg-pink-500/10 ",
  },
  music: {
    icon: MusicIcon,
    href: "/music",
    label: "Music Generation",
    color: " text-gray-500 ",
    bgColor: "bg-gray-500/10",
  },
};
// video: {
//   icon: VideoIcon,
//   href: "/video",
//   label: "Video Generation",
//   color: "text-orange-700",
//   bgColor: "bg-orange-700/10",
// },
export const routesObjects = {
  dashboard: {
    icon: LayoutDashboard,
    href: "/dashboard",
    label: "Dashboard",
    color: " text-sky-500",
  },
  ...toolsObjects,

  settings: {
    icon: Settings,
    href: "/settings",
    label: "settings",
    color: " text-white-500",
    bgColor: "bg-gray-700/10",
  },
};
