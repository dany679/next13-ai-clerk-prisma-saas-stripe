import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingIconProps {
  Icon: LucideIcon;
  iconColor: string;
  bgColor?: string;
}

const HeadingIcon = ({ Icon, iconColor, bgColor }: HeadingIconProps) => {
  return (
    <div className={cn("p-2 w-fit rounded-md", bgColor)}>
      <Icon className={cn("w-10 h-10", iconColor)} />
    </div>
  );
};

export default HeadingIcon;
