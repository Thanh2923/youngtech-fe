"use client";
import React from "react";
import { useState, useEffect } from "react";
import PaginationBtn from "@/components/dashboard/Pagination/Pagination";
import LayoutListOrderPending from "@/components/dashboard/PendingOrders/LayoutListOrderPending";
import ColPendingOrder from "@/components/dashboard/PendingOrders/ColPendingOrder";
import HeaderTable from "@/components/dashboard/PendingOrders/Header_table";
import ListOrderPending from "@/components/dashboard/PendingOrders/ListOrderPending";
interface Order {
  id: number;
  fullName: string;
  code: string;
  date: string;
}
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
import { useSession } from "next-auth/react";
const Page = () => {
  // const listOderPending: Order[] = [
  //   {
  //     id: 1,
  //     fullName: "trần văn ý",
  //     code: "94739473",
  //     date: "2022-01-01"
  //   },
  //   {
  //     id: 2,
  //     fullName: "trần văn ý",
  //     code: "94739473",
  //     date: "2022-01-01"
  //   },
  //   {
  //     id: 3,
  //     fullName: "trần văn ý",
  //     code: "94739473",
  //     date: "2022-01-01"
  //   },
  //   {
  //     id: 4,
  //     fullName: "trần văn ý",
  //     code: "94739473",
  //     date: "2022-01-01"
  //   },
  //   {
  //     id: 5,
  //     fullName: "trần văn ý",
  //     code: "94739473",
  //     date: "2022-01-01"
  //   },
  //   {
  //     id: 6,
  //     fullName: "trần văn ý",
  //     code: "94739473",
  //     date: "2022-01-01"
  //   }
  // ];
  const { data: session, status } = useSession();
  const [listOderPending, setListOderPending] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetchData = async () => {
    const response = await axios.get(`${baseURL}/order/getPendingOrders`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    });
    console.log(response);
    console.log(`Response :`, response.data);

    if (response.status === 200) {
      setListOderPending(response.data.data);
      // console.log(response.data.pagination.currentPage);
      // setCurrentPage(response.data.pagination.currentPage);
      // setTotalPages(response.data.pagination.totalPages);
      console.log("ok");
    }
  };

  useEffect(() => {
    if (!session || !session.accessToken) {
      console.warn("Session not ready or token missing");
      return;
    }
    fetchData();
  }, [session]);

  return (
    <div>
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">
          DANH SÁCH ĐƠN HÀNG CHƯA SỬ LÝ
        </h2>
      </header>
      <main>
        <LayoutListOrderPending>
          <HeaderTable />
          <ColPendingOrder />
          <div className="list-customer">
            {listOderPending.map((orderPending, index) => (
              <ListOrderPending
                key={index}
                orderPending={orderPending}
                indexs={index}
              />
            ))}
            {listOderPending.length === 0 && (
              <>
                <h2 className="text-center text-white text-[1.3rem] py-5 my-10">
                  Hiện tại chưa có đơn hàng nào có trạng thái chưa sử lý !
                </h2>
              </>
            )}
          </div>
        </LayoutListOrderPending>
      </main>
      <PaginationBtn />
    </div>
  );
};

export default Page;
