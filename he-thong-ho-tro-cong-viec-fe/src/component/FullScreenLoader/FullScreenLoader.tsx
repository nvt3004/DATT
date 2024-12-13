// FullScreenLoader.tsx
"use client";

import React from "react";
import { LoadingOverlay } from "@mantine/core";
import ReactDOM from "react-dom";

export const FullScreenLoader = ({ visible }: { visible: boolean }) => {
  if (typeof document === "undefined") return null;

  return ReactDOM.createPortal(
    <LoadingOverlay visible={visible} overlayProps={{ radius: "sm", blur: 2, className: "fullscreen-loader" }} />,
    document.body // Hiển thị overlay trên toàn màn hình
  );
};
