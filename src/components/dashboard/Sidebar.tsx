"use client";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, Command } from "lucide-react";
import { useSession } from "next-auth/react"; // To fetch user info and roles

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { IoIosPeople } from "react-icons/io";
import { GiJerusalemCross } from "react-icons/gi";
import {
  FaBusinessTime,
  FaClipboardList,
  FaWarehouse,
  FaFileInvoice,
} from "react-icons/fa";
import { GrCatalog } from "react-icons/gr";
import { FcTwoSmartphones } from "react-icons/fc";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Quản lý nhân viên",
      url: "quanly-nhanvien",
      icon: IoIosPeople,
      roles: ["admin"], // Only admin has access
      items: [
        {
          title: "Tạo nhân viên",
          url: "quanly-nhanvien/tao-nhanvien",
        },
      ],
    },
    {
      title: "Quản lý bán hàng",
      url: "quanly-banhang/ban-hang",
      icon: GiJerusalemCross,
      roles: ["admin", "storekeeper"], // admin and storekeeper have access
      items: [
        {
          title: "Bán hàng",
          url: "quanly-banhang/ban-hang",
        },
        {
          title: "Đơn hàng chưa xử lý",
          url: "quanly-banhang/donhang-chua-xuly",
        },
        {
          title: "danh sách hóa đơn",
          url: "quanly-banhang/danhsach-hoadon",
        },
      ],
    },
    {
      title: "Quản lý kinh doanh",
      url: "quanly-kinhdoanh/danhthu-loinhuan",
      icon: FaBusinessTime,
      roles: ["admin", "businessEmployee"], // admin and businessEmployee have access
      items: [
        {
          title: "Giá bán lẻ",
          url: "quanly-kinhdoanh/giaban-le",
        },
        {
          title: "Danh thu và lợi nhuận",
          url: "quanly-kinhdoanh/danhthu-loinhuan",
        },
        {
          title: "Thông tin khách hàng",
          url: "quanly-kinhdoanh/thongtin-khachhang",
        },
      ],
    },
    {
      title: "Danh mục sản phẩm",
      url: "quanly-danhmuc-sanpham",
      icon: GrCatalog,
      roles: ["admin"], // Only admin has access
      items: [
        {
          title: "Danh mục cha",
          url: "quanly-danhmuc-sanpham/danhsach-danhmuc-cha",
        },
        {
          title: "Danh mục con",
          url: "quanly-danhmuc-sanpham/danhsach-danhmuc-con",
        },
      ],
    },
    {
      title: "Quản lý nhà cung cấp",
      url: "quanly-nha-cungcap",
      icon: FaClipboardList,
      roles: ["admin"], // Only admin has access
    },
    {
      title: "Quản lý nhập kho hàng",
      url: "quanly-nhap-khohang",
      icon: FaBusinessTime,
      items: [
        {
          title: "Nhập kho",
          url: "quanly-nhap-khohang",
        },
        {
          title: "Danh sách sản phẩm",
          url: "quanly-nhap-khohang/danh-sach-san-pham",
        },
      ],
    },
    {
      title: "Danh sách hóa đơn",
      url: "quanly-hoadon",
      icon: FaFileInvoice,
      roles: ["admin"], // Only admin has access
    },
  ],
};

export default function SidebarAdmin() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession(); // Fetch user session

  const userRole = session?.user?.role; // Get user role from session

  return (
    <Sidebar className="bg-[#22282E] p-2 text-slate-300" variant="inset">
      <div className="bg-[#282F36] h-[100vh] rounded-2xl">
        <SidebarHeader className="text-slate-300">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4 text-black" />
                  </div>
                  <div className="flex justify-between items-center text-left text-sm leading-tight">
                    <span className="truncate text-xl text-white font-semibold">
                      Dashboard
                    </span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="text-slate-300">
          <SidebarGroup>
            <SidebarMenu>
              {data.navMain.map((item: any) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className="py-5 hover:bg-transparent!important hover:text-white"
                      asChild
                      tooltip={item.title}
                    >
                      <button
                        type="button"
                        className={`${
                          pathname.includes(item.url)
                            ? "bg-black/50 hover:bg-slate-600 text-white "
                            : ""
                        }`}
                        onClick={() => router.push(`/dashboard/${item.url}`)}
                      >
                        <item.icon />
                        <span className="text-[15px] font-[500]">
                          {item.title}
                        </span>
                      </button>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem: any) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  className="py-5 hover:bg-gray-900 hover:text-white"
                                  asChild
                                >
                                  <button
                                    type="button"
                                    className={`${
                                      pathname.includes(subItem.url)
                                        ? "bg-gray-600 hover:bg-gray-600 text-black"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      router.push(`/dashboard/${subItem.url}`)
                                    }
                                  >
                                    <span className="text-[16px] text-white/60 font-semibold">
                                      {subItem.title}
                                    </span>
                                  </button>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
