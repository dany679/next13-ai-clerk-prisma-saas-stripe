"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toolsObjects } from "@/utils/constants";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of IA
        </h2>
        <p className="text-center  font-light text-sm md:text-lg text-muted-foreground">
          Chat with the smartest AI - Experience the power of IA
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {Object.entries(toolsObjects).map((routeArr) => {
          const tool = routeArr[1];
          return (
            <Card
              onClick={() => router.push(tool.href)}
              key={tool.href}
              className=" flex items-center justify-between p-4 border-black/5 hover:shadow-md transition cursor-pointer "
            >
              <div className={cn("flex items-center gap-x-4")}>
                <div
                  className={cn(
                    "p-2 w-fit rounded-md  ",
                    // bg-pink-500/10 bg-gray-700/10 bg-green-700/10 bg-violet-500/10
                    tool.bgColor
                  )}
                >
                  <tool.icon className={cn("w-8 h-8 ", tool.color)} />
                </div>
                <div className={cn("font-bold")}>{tool.label}</div>
                {/* <div className={cn("w-8 h-8", tool.color)}>{tool.bgColor}</div>
                <div className="font-bold">{tool.color}</div> */}
              </div>
              <ArrowRight className="w-5 h-5" />
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default DashboardPage;
