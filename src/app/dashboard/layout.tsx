import HeaderAdmin from "@/components/dashboard/HeaderAdmin";
import SiderbarAdmin from "@/components/dashboard/Sidebar";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider className="bg-[#22282E]">
        <ToastContainer /> <SiderbarAdmin />
        <SidebarInset>
          <HeaderAdmin />
          <main className="w-full flex justify-center  ">
            <section className="w-[90%]">{children}</section>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
