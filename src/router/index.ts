import CommonLayout from "@/components/layout/common/common";
import DashBoardLayout from "@/components/layout/admin/dash-board";
import { createBrowserRouter } from "react-router";
import LoginPage from "@/page/auth/login";
import SignUpPage from "@/page/auth/signUp";

export const router = createBrowserRouter([
  { index: true, path: "/", Component: CommonLayout },
  { path: "/", Component: CommonLayout },
  { path: "/dashboard", Component: DashBoardLayout },
  { path: "/login", Component: LoginPage },
  { path: "/signup", Component: SignUpPage },
]);
