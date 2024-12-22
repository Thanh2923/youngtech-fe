'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import từ 'next/navigation' cho App Router

type OrderHistory = {
  orderId: number;
  orderDate: string;
  succesDate: string | null;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  customerId: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
};

const ListOrderByCustomer = () => {
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Lấy `customerId` từ URL bằng cách đọc từ `window.location`
  useEffect(() => {
    const fetchOrderHistory = async () => {
      // Lấy `customerId` từ URL
      const urlPath = window.location.pathname;
      const customerId = urlPath.split('/').pop(); // Lấy phần cuối của URL
      if (!customerId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/customers/getOrderHistoryByCustomerId/${customerId}`
        );
        const data = await response.json();
        setOrderHistory(data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) {
    return <div>Đang tải lịch sử mua hàng...</div>;
  }

  return (
    <div className="order-history">
      {orderHistory.length > 0 ? (
        <table className="table-auto w-full text-white/50 border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Mã đơn hàng</th>
              <th className="border border-gray-300 px-4 py-2">Ngày đặt</th>
              <th className="border border-gray-300 px-4 py-2">Tổng tiền</th>
              <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
              <th className="border border-gray-300 px-4 py-2">Phương thức thanh toán</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr key={order.orderId}>
                <td className="border border-gray-300 px-4 py-2">{order.orderId}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                </td>
                <td className="border border-gray-300 px-4 py-2">{order.totalAmount.toLocaleString()} VND</td>
                <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                <td className="border border-gray-300 px-4 py-2">{order.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Không có lịch sử mua hàng nào.</div>
      )}
    </div>
  );
};

export default ListOrderByCustomer;
