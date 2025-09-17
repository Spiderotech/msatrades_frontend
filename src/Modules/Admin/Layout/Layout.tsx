import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar - Fixed Position */}
      <div className="w-64 h-screen fixed top-0 left-0">
        <Sidebar />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 ml-64 overflow-auto h-screen p-6 bg-gray-100">
        <Outlet /> {/* Renders child routes */}
      </div>
    </div>
  );
};

export default Layout;
