import CommonLayout from "@/components/layout/common/common";
import DashBoardLayout from "@/components/layout/admin/dash-board";
import { createBrowserRouter } from "react-router";
import LoginPage from "@/page/auth/login";
import SignUpPage from "@/page/auth/signUp";
import ParcelPage from "@/page/user/parcels-page";
import Analytics from "@/page/user/analytics";
import TrackParcel from "@/page/user/track-parcel";
import AnalyticsAdmin from "@/page/admin/analytics";
import userManagement from "@/page/admin/userManagement";
import parcelManagement from "@/page/admin/parcelManagement";
import HomePage from "@/page/home/home";
import { protectRoute } from "@/utils";
import Unauthorized from "@/page/unauthorized";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CommonLayout,
    children: [{ index: true, Component: HomePage }],
  },
  {
    path: "/admin",
    Component: protectRoute(DashBoardLayout, "admin"),
    children: [
      { index: true, Component: AnalyticsAdmin },
      { path: "analytics", Component: AnalyticsAdmin },
      { path: "users", Component: userManagement },
      { path: "parcels", Component: parcelManagement },
      { path: "track-parcel", Component: TrackParcel },
    ],
  },
  {
    path: "/user",
    Component: protectRoute(DashBoardLayout, "user"),
    children: [
      { index: true, Component: Analytics },
      { path: "analytics", Component: Analytics },
      { path: "parcels", Component: ParcelPage },
      { path: "track-parcel", Component: TrackParcel },
    ],
  },
  { path: "/login", Component: LoginPage },
  { path: "/signup", Component: SignUpPage },
  { path: "/not-authorized", Component: Unauthorized },
]);
