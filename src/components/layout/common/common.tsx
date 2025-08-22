import { Outlet } from "react-router";
import { Navbar } from "../../navbar";

function CommonLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default CommonLayout;
