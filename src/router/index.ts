import CommonLayout from "@/components/layout/common/common";
import DashBoardLayout from "@/components/layout/admin/dash-board";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  { index: true, path: "/", Component: CommonLayout },
  { path: "/", Component: CommonLayout },
  { path: "/admin", Component: DashBoardLayout },
]);
