"use client";
import React from "react";
import { ShinyRotatingBorderButton } from "./ButtonSave/BtnSave";
const GoBack = () => {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <>
      <ShinyRotatingBorderButton onClick={handleGoBack}>
        Quay lại
      </ShinyRotatingBorderButton>
    </>
  );
};

export default GoBack;
