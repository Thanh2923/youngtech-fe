"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import Link from "next/link";
const PaginationBtn = () => {
  return (
    <div className="my-5 ">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <Link
              className="text-black/50  py-2 px-3 rounded-md bg-slate-300 hover:bg-slate-500 transition-all duration-300 ease"
              href="#"
            >
              1
            </Link>
          </PaginationItem>
          <PaginationItem>
            <Link
              className="text-black/50  py-2 px-3 rounded-md bg-slate-300 hover:bg-slate-500 transition-all duration-300 ease"
              href="#"
            >
              2
            </Link>
          </PaginationItem>
          <PaginationItem>
            <Link
              className="text-black/50  py-2 px-3 rounded-md bg-slate-300 hover:bg-slate-500 transition-all duration-300 ease"
              href="#"
            >
              3
            </Link>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default PaginationBtn;
