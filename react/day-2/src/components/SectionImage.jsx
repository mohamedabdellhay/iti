import React from "react";

export default function SectionImage({ img }) {
  return (
    <div className="flex justify-center">
      <img
        src={img}
        alt="Furniture illustration"
        className="w-full max-w-md h-auto rounded-lg shadow-lg"
      />
    </div>
  );
}
