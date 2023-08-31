"use client";

import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";
// import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export const SubscriptionButton = ({ isPro = false }: { isPro: boolean }) => {
  const [subscribing, setSubscribing] = useState(false);

  const onClick = async () => {
    try {
      setSubscribing(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <Button
      variant={isPro ? "default" : "premium"}
      disabled={subscribing}
      onClick={onClick}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
