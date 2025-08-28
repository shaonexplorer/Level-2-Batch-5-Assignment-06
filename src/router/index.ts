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
import { ContactPage } from "@/page/contact";
import { AboutPage } from "@/page/about";
import { FaqPage } from "@/page/faq";
import TrackParcelPage from "@/page/track-parcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CommonLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "/contact", Component: ContactPage },
      { path: "/about", Component: AboutPage },
      { path: "/faq", Component: FaqPage },
      { path: "/tracking", Component: TrackParcelPage },
    ],
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
    Component: protectRoute(DashBoardLayout, "sender"),
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
