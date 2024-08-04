import { Outlet } from "react-router-dom";

import Topbar from "@/components/Shared/Topbar";
import Bottombar from "@/components/Shared/Bottombar";
import LeftSidebar from "@/components/Shared/LeftSidebar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;