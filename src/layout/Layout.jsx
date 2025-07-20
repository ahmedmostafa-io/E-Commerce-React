import React from "react";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className="container selection:bg-slate-400">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
