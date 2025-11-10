import React from "react";
import Header from "../components/Header";
export default function Layout({ children }) {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <Header />
        <div className="p-6"> {children}</div>
      </div>
    </div>
  );
}
