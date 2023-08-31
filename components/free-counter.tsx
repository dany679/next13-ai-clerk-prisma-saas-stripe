// "use client";
import { useProModal } from "@/hooks/use-pro-modal";
import { MAX_FREE_COUNTS } from "@/utils/constants";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

const FreeCounter = ({
  apiLimitCount,
  isPro,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  if (isPro) {
    return null;
  }
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div
            className="text-center text-sm text-white  space-y-2 mb-4 

          "
          >
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generation
            </p>

            <Progress
              className="h-4"
              value={Math.round((apiLimitCount * 100) / MAX_FREE_COUNTS)}
            />
          </div>
          <Button
            onClick={proModal.onOpen}
            type="button"
            variant="premium"
            className="w-full"
          >
            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
