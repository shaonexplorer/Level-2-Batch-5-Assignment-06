import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

import logo from "../assets/logo.svg";
import { useGetMeQuery } from "@/redux/api/user.api/user.api";
import { navAdmin } from "@/router/adminMenuList";
import { navUser } from "@/router/userMenuList";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useGetMeQuery(undefined);

  const navMain = userData?.data?.role == "admin" ? navAdmin : navUser;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to={"/"} className="flex items-center gap-2">
          <img src={logo} width={30} height={30}></img>
          <p>PH Courier</p>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
