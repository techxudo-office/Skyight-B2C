import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-6 h-6 border-4 border-white rounded-full border-t-transparent animate-spin" />
    </div>
  );
};

export default Loader;
