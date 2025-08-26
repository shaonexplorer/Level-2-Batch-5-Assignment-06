import { Outlet } from "react-router";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { useGetMeQuery } from "@/redux/api/user.api/user.api";

function CommonLayout() {
  const { data: userData, isLoading } = useGetMeQuery(undefined);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar userData={userData} isLoading={isLoading} />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default CommonLayout;
