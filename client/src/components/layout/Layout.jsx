import Navbar from "./Navbar";
import Sidebar from "./Sidebar";  
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      

      <div className="flex">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-8">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;