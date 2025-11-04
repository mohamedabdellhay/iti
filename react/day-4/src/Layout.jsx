import { useLocation } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import React, { useEffect } from "react";

export default function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);

    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
