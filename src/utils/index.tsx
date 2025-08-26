import { useGetMeQuery } from "@/redux/api/user.api/user.api";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const protectRoute = (
  Component: ComponentType,
  requiredRole: string
) => {
  return () => {
    const { data: userData, isLoading } = useGetMeQuery(undefined);

    if (!isLoading && !userData?.data?.userId?.email) {
      return <Navigate to="/login" />;
    }

    if (
      !isLoading &&
      requiredRole &&
      userData?.data?.userId?.email &&
      requiredRole !== userData?.data?.role
    ) {
      return <Navigate to="/not-authorized" />;
    }

    if (!isLoading) return <Component />;
  };
};
