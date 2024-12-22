import React, { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const ListOrderPending = ({ orderPending, indexs }: TableRowProps) => {
  const { data: session, status } = useSession();
  const [orderView, setOrderView] = useState({
    totalAmount: 0,
    orderDate: "",
    paymentMethod: "",
    fullName: "",
    phoneNumber: "",
    address: ""
  });
  const handleViewOrder = async (orderId: number) => {
    console.log(`Click here! ${orderId}`);
    const response = await axios.get(`${baseURL}/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    });
    console.log(`response 1 : `, response.data);
    if (response.status === 200) {
      setOrderView({
        totalAmount: response.data.data.totalAmount,
        orderDate: response.data.data.orderDate,
        paymentMethod: response.data.data.paymentMethod,
        fullName: response.data.data.fullName,
        phoneNumber: response.data.data.phoneNumber,
        address: response.data.data.address
      });
      return;
    } else {
      return toast.error("Fetch data fail");
    }
  };
  const handleUpdate = async (orderId: number) => {
    if (!session || !session.accessToken) {
      return toast.info("Vui lòng đăng nhập");
    }
    const response = await axios.put(
      `${baseURL}/order/updateOrderStatus`,
      { orderId , status: "Success" },
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      }
    );
    console.log(response);
    if (!response) {
      return toast.error("Lỗi khi gọi api ! Vui lòng thử lại");
    }
 
    return toast.success("Update thành công!");
  };
  console.log(orderView);
  const date = new Date(orderPending.orderDate);
  const formatDate = format(date, "dd-MM-yyyy");
  return (
    <>
      <ToastContainer />
      <div className="product-item border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]">
        <div className="content-product-header p-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-[0.9rem] text-white/90 w-[calc(100%-90%)]">
              {indexs + 1}
            </div>
            <div className="font-bold  text-white/80 w-[calc(100%-90%)]">
              <span className=" text-[0.8rem]">
                {orderPending.customerName}
              </span>
            </div>
            <div className="font-bold  text-white/80 w-[calc(100%-80%)]">
              <span className=" text-[0.8rem]">
                {orderPending.totalAmount.toLocaleString("vi-VN")}
              </span>
            </div>
            <div className="font-bold  text-white/80 w-[calc(100%-80%)]">
              <AlertDialog>
                <AlertDialogTrigger>
                  <button
                    onClick={() => handleViewOrder(orderPending.id)}
                    className="rounded-xl hover:bg-red-500/50 hover:text-white duration-300 transition-all  text-white/50 text-sm py-2 px-2 border border-white/50"
                  >
                    Xem đơn hàng
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Thông tin chi tiết !</AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="flex flex-col gap-3">
                        <h2>Tên khách hàng : {orderView.fullName}</h2>
                        <h2>Địa chỉ khách hàng : {orderView.address}</h2>
                        <h2>
                          Phương thức thanh toán : {orderView.paymentMethod}
                        </h2>
                        <h2>Số điện thoại : {orderView.phoneNumber}</h2>
                        <h2>
                          Tổng hóa đơn :{" "}
                          {orderView.totalAmount.toLocaleString("vi-VN")}
                        </h2>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Đóng</AlertDialogCancel>
                    {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
              <span className=" text-[0.8rem]">{formatDate}</span>
            </div>
            <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
              <AlertDialog>
                <AlertDialogTrigger>
                  <button className="rounded-xl hover:bg-red-500/50 hover:text-white duration-300 transition-all  text-white/50 text-sm py-2 px-2 border border-white/50">
                    Update
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Bạn có muốn update đơn hành từ trạng thái{" "}
                      <span className="text-red-500">đợi</span> sang{" "}
                      <span className="text-red-500">xác nhận</span>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Đồng ý có nghĩa là chuyển đơn hàng thành trạng thái
                      success!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleUpdate(orderPending.id)}
                    >
                      Đồng ý
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListOrderPending;
