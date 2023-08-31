"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import { toolsObjects } from "@/utils/constants";
import axios from "axios";
import { Check, Zap } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
const ProModal = () => {
  const proModal = useProModal();
  const [isSubscribing, setIsSubscribing] = useState(false);

  const onSubscribe = async () => {
    try {
      setIsSubscribing(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-2  justify-center font-bold py-2">
            Upgrade to Genius
            <Badge variant={"premium"}>PRO</Badge>
          </DialogTitle>
          <DialogDescription className="space-y-2">
            {Object.entries(toolsObjects).map((tools) => {
              if (tools[0] === "music") return;
              const tool = tools[1];
              return (
                <Card
                  // onClick={() => router.push(tool.href)}
                  key={tool.href}
                  className=" flex items-center justify-between  p-4 border-black/5 hover:shadow-md transition cursor-pointer w-full  "
                >
                  <div className={cn("flex items-center gap-x-4")}>
                    <div className={cn("p-2 w-fit rounded-md  ", tool.bgColor)}>
                      <tool.icon className={cn("w-6 h-6 ", tool.color)} />
                    </div>
                    <div className={cn("font-bold")}>{tool.label}</div>
                  </div>
                  <Check className="text-primary w-5 h-5 items-center" />
                </Card>
              );
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isSubscribing}
            onClick={onSubscribe}
            size="lg"
            variant="premium"
            className="w-full"
          >
            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
