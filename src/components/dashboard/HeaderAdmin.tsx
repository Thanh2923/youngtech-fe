import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitcherButton } from "./darkmode";
import { SearchBar } from "./SearchBar";
import Logout from "./user/user/Logout";
const HeaderAdmin = () => {
  return (
    <header className="flex h-16 w-full  justify-between  items-center mb-10 gap-2 rounded-xl text-[#c8d2db]  ">
      <div className="flex items-center gap-2 ml-[90px] px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-[#c8d2db]">
                Home
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-4 items-center mr-[90px] ">
        <ThemeSwitcherButton />
        <Logout />
        <SearchBar />
      </div>
      {/* <SearchAdmin/> */}
    </header>
  );
};

export default HeaderAdmin;
