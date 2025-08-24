import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { ModeToggle } from "../common/mode.toggle";

export default function DashBoardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center  border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-auto">
            <ModeToggle />
          </div>

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min m-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
