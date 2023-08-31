"use client";
import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";
export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("c8e3821f-9787-4c39-84ce-e14e24e1e189");
  }, []);
  return null;
};
