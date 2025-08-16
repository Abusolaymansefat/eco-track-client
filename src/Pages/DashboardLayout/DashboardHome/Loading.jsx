import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ScaleLoader color="#2563eb" height={40} width={4} />
    </div>
  );
};

export default Loading;
