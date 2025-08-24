import CommonLayout from "@/components/layout/common/common";
import DashBoardLayout from "@/components/layout/admin/dash-board";
import { createBrowserRouter } from "react-router";
import LoginPage from "@/page/auth/login";
import SignUpPage from "@/page/auth/signUp";
import ParcelPage from "@/page/user/parcels-page";
import Analytics from "@/page/user/analytics";
import TrackParcel from "@/page/user/track-parcel";

export const router = createBrowserRouter([
  { index: true, path: "/", Component: CommonLayout },
  { path: "/", Component: CommonLayout },
  { path: "/admin", Component: DashBoardLayout },
  {
    path: "/user",
    Component: DashBoardLayout,
    children: [
      { index: true, Component: Analytics },
      { path: "analytics", Component: Analytics },
      { path: "parcels", Component: ParcelPage },
      { path: "track-parcel", Component: TrackParcel },
    ],
  },
  { path: "/login", Component: LoginPage },
  { path: "/signup", Component: SignUpPage },
]);
