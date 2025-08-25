import { Loader, MenuIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router";

import logo from "../../../assets/logo.svg";
import { ModeToggle } from "./mode.toggle";
import { useLogoutMutation } from "@/redux/api/auth.api/auth.api";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { userApi } from "@/redux/api/user.api/user.api";

type NavbarProps = {
  userData: {
    success: boolean;
    data: { role: string; userId: { email: string } };
  };
  isLoading: boolean;
};

const Navbar = ({ userData, isLoading }: NavbarProps) => {
  const dispatch = useAppDispatch();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logout(undefined).unwrap();
      dispatch(userApi.util.resetApiState());
      console.log("logout response", res);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const features = [
    {
      title: "Dashboard",
      description: "Overview of your activity",
      href: "/user",
      role: "sender",
    },
    {
      title: "Dashboard",
      description: "Overview of your activity",
      href: "/admin",
      role: "admin",
    },
    {
      title: "Analytics",
      description: "Track your performance",
      href: "/user/analytics",
      role: "sender",
    },
    {
      title: "Analytics",
      description: "Track your performance",
      href: "/admin/analytics",
      role: "admin",
    },
    {
      title: "Support",
      description: "Get help when needed",
      href: "#",
      role: "public",
    },
  ];

  return (
    <section className="py-4">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 w-[200px] ">
            <img src={logo} className="max-h-8" alt="Shadcn UI Navbar" />
            <p className="text-lg font-semibold tracking-tighter">PH Courier</p>
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 p-3">
                    {features.map((feature, index) => {
                      return (
                        <>
                          {feature.role == userData?.data.role && (
                            <NavigationMenuLink
                              asChild
                              key={index}
                              className="rounded-md p-3 transition-colors hover:bg-muted/70"
                            >
                              <Link to={feature.href}>
                                <div key={feature.title}>
                                  <p className="mb-1 font-semibold text-foreground">
                                    {feature.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                  </p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          )}
                          {feature.role == "public" && (
                            <NavigationMenuLink
                              asChild
                              key={index}
                              className="rounded-md p-3 transition-colors hover:bg-muted/70"
                            >
                              <Link to={feature.href}>
                                <div key={feature.title}>
                                  <p className="mb-1 font-semibold text-foreground">
                                    {feature.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                  </p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          )}
                        </>
                      );
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Products
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Resources
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="items-center gap-4 flex ml-auto mr-4 sm:ml-0 sm:mr-0">
            <ModeToggle />
            <div className="hidden items-center gap-4 lg:flex">
              {!userData?.data?.userId?.email && (
                <Link to={"/login"}>
                  <Button className="w-[100px]">
                    {isLoading ? <Loader /> : `Sign in`}
                  </Button>
                </Link>
              )}
              {userData?.data?.userId?.email && (
                <Button className="w-[100px]" onClick={handleLogout}>
                  {isLoading ? <Loader /> : `Sign Out`}
                </Button>
              )}

              {/* <Button>Start for free</Button> */}
            </div>
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link to="/" className="flex items-center gap-2">
                    <img
                      src={logo}
                      className="max-h-8"
                      alt="Shadcn UI Navbar"
                    />
                    <span className="text-lg font-semibold tracking-tighter">
                      PH Courier
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <Accordion type="single" collapsible className="mt-4 mb-2">
                  <AccordionItem value="solutions" className="border-none">
                    <AccordionTrigger className="text-base hover:no-underline">
                      Features
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid md:grid-cols-2">
                        {features.map((feature, index) => (
                          <a
                            href={feature.href}
                            key={index}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70"
                          >
                            <div key={feature.title}>
                              <p className="mb-1 font-semibold text-foreground">
                                {feature.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-col gap-6">
                  <a href="#" className="font-medium">
                    Templates
                  </a>
                  <a href="#" className="font-medium">
                    Blog
                  </a>
                  <a href="#" className="font-medium">
                    Pricing
                  </a>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Button variant="outline">Sign in</Button>
                  {/* <Button>Start for free</Button> */}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export { Navbar };
