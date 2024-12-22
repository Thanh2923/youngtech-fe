"use client";
import React, { useEffect, useState } from "react";

import PaginationBtn from "@/components/dashboard/Pagination/Pagination";
import ListInvoice from "@/components/dashboard/invoice/ListInvoice";
import HeaderTable from "@/components/dashboard/invoice/Header_table";
import ColInvoice from "@/components/dashboard/invoice/ColInvoice";
import LayoutListInvoice from "@/components/dashboard/invoice/LayoutListInvoice";
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session, status } = useSession();
  const [listInvoices, setListInvoice] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetchData = async (page) => {
    const response = await axios.get(
      `${baseURL}/outInvoice/getAllOutInvoice?page=${page}&limit=2`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      }
    );
    console.log(response);
    console.log(`Response :`, response.data);

    if (response.status === 200) {
      setListInvoice(response.data.data);
      console.log(response.data.pagination.currentPage);
      setCurrentPage(response.data.pagination.currentPage);
      setTotalPages(response.data.pagination.totalPages);
      console.log("ok");
    }
  };

  useEffect(() => {
    if (!session || !session.accessToken) {
      console.warn("Session not ready or token missing");
      return;
    }
    fetchData(page);
  }, [page]);
  console.log(`listInvoices :`, listInvoices);
  return (
    <div>
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">
          DANH SÁCH HÓA ĐƠN
        </h2>
      </header>
      <main>
        <LayoutListInvoice>
          <HeaderTable />
          <ColInvoice />
          <div className="list-customer">
            {listInvoices.map((invoice, index) => (
              <ListInvoice key={index} invoice={invoice} />
            ))}
          </div>
        </LayoutListInvoice>
      </main>
      <div className="flex justify-center gap-3 items-center mt-5">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="text-black/70 p-2 text-sm rounded-2xl bg-white"
        >
          Previous
        </button>
        <span className="text-white text-sm mx-4">
          Page {page} of {totalPages}
        </span>
        <button
          className="text-black/70 text-sm p-2 rounded-2xl bg-white"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
