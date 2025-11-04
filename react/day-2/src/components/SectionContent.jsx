import React from "react";

export default function SectionContent({ title, desc, Buttons }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600 leading-relaxed">{desc}</p>
      </div>
      <div className="flex space-x-4">{Buttons}</div>
    </div>
  );
}
