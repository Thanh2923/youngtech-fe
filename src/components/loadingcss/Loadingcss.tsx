import React from "react";
import "./loading.css";

const Loadingcss = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <span className="loader"></span>
    </div>
  );
};

export default Loadingcss;
