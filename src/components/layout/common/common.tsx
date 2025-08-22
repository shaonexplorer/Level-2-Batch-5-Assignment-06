import { Outlet } from "react-router";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

function CommonLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default CommonLayout;
