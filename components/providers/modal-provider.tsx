"use client";

import ProModal from "@/components/modals/pro-modal";
import { useEffect, useState } from "react";

const ProviderModal = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {};
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProModal />
    </>
  );
};

export default ProviderModal;
