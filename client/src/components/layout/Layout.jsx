import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "#FFF8EC" }}
    >
      <Sidebar />

      <main
        className="flex flex-1 flex-col overflow-hidden"
        style={{ color: "#071533" }}
      >
        <div className="flex-1 min-h-0 ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;