"use client";
// import React, { useState } from "react";
// import { format } from "date-fns";
// import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { ChartConfig, ChartContainer } from "@/components/ui/chart";
// import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
// import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
// import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";

// const chartData = [
//   { month: "Jan", Doanh_thu: 186, Loi_nhuan: 80 },
//   { month: "Feb", Doanh_thu: 305, Loi_nhuan: 200 },
//   { month: "Mar", Doanh_thu: 237, Loi_nhuan: 120 },
//   { month: "Apr", Doanh_thu: 73, Loi_nhuan: 190 },
//   { month: "May", Doanh_thu: 209, Loi_nhuan: 130 },
//   { month: "Jun", Doanh_thu: 214, Loi_nhuan: 140 },
// ];

// const chartConfig = {
//   Doanh_thu: {
//     label: "Doanh thu",
//     color: "hsl(var(--chart-1))",
//   },
//   Loi_nhuan: {
//     label: "Lợi nhuận",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig;

// function DatePicker({
//   label,
//   date,
//   setDate,
// }: {
//   label: string;
//   date: Date | undefined;
//   setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
// }) {
//   return (
//     <div className="mb-4">
//       <label className="block text-dark mb-2">{label}</label>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             className="w-full justify-start text-left font-normal bg-black-200"
//           >
//             <span className="mr-2 h-4 w-4">📅</span>
//             {date ? format(date, "PPP") : "Chọn ngày"}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0">
//           <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }

// export default function RevenueReport() {
//   const [startDate, setStartDate] = useState<Date>();
//   const [endDate, setEndDate] = useState<Date>();

//   const handleApply = () => {
//     console.log("Từ ngày:", startDate);
//     console.log("Đến ngày:", endDate);
//   };

//   return (
//     <div className="bg-backgroundAdmin-bg min-h-screen p-6 text-white rounded-xl">
//       <h1 className="text-center text-2xl font-bold mb-6">
//         BÁO CÁO DOANH THU VÀ LỢI NHUẬN
//       </h1>
//       <div className="grid grid-cols-4 gap-4">
//         <div className="col-span-1">
//           <div className="space-y-4 bg-black/40 rounded-xl p-4">
//             <button className="w-full border border-white/30 py-2 bg-transparent rounded-xl">
//               Lọc theo thời gian
//             </button>
//             <button className="w-full border border-white/30 py-2 bg-transparent rounded-xl">
//               Tổng doanh thu
//             </button>
//             <button className="w-full border border-white/30 py-2 bg-transparent rounded-xl">
//               Tổng chi phí
//             </button>
//             <button className="w-full border border-white/30 py-2 bg-transparent rounded-xl">
//               Tổng lợi nhuận
//             </button>
//           </div>
//         </div>
//         <div className="col-span-3">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="p-4 bg-black/40 rounded-md">
//               <h2 className="text-lg font-bold mb-4 text-white">
//                 Lọc theo thời gian
//               </h2>
//               <form>
//                 <DatePicker label="Từ ngày:" date={startDate} setDate={setStartDate} />
//                 <DatePicker label="Đến ngày:" date={endDate} setDate={setEndDate} />
//                 <ShinyRotatingBorderButton onClick={handleApply}>
//                   Áp dụng
//                 </ShinyRotatingBorderButton>
//               </form>
//             </div>
//             <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
//               <BarChart accessibilityLayer data={chartData}>
//                 <CartesianGrid vertical={false} />
//                 <XAxis
//                   dataKey="month"
//                   tickLine={false}
//                   tickMargin={10}
//                   axisLine={false}
//                   tickFormatter={(value) => value.slice(0, 3)}
//                 />
//                 <ChartTooltip content={<ChartTooltipContent />} />
//                 <ChartLegend content={<ChartLegendContent />} />
//                 <Bar
//                   dataKey="Doanh_thu"
//                   fill="var(--color-Doanh_thu)"
//                   radius={4}
//                 />
//                 <Bar
//                   dataKey="Loi_nhuan"
//                   fill="var(--color-Loi_nhuan)"
//                   radius={4}
//                 />
//               </BarChart>
//             </ChartContainer>
//           </div>
//           <div className="mt-4 p-4 bg-black/40 rounded-md">
//             <h2 className="text-lg font-bold mb-2">
//               Bảng chi tiết doanh thu và lợi nhuận bán đồ điện tử
//             </h2>
//             <div className="border border-white/20 rounded-md overflow-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-[150px]">Sản phẩm</TableHead>
//                     <TableHead className="w-[100px] text-center">
//                       Số lượng bán
//                     </TableHead>
//                     <TableHead className="w-[150px] text-right">Doanh thu</TableHead>
//                     <TableHead className="w-[150px] text-right">Lợi nhuận</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell className="font-medium">Điện thoại iPhone 14</TableCell>
//                     <TableCell className="text-center">120</TableCell>
//                     <TableCell className="text-right">120,000</TableCell>
//                     <TableCell className="text-right">30,000</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Laptop Dell XPS 15</TableCell>
//                     <TableCell className="text-center">50</TableCell>
//                     <TableCell className="text-right">75,000</TableCell>
//                     <TableCell className="text-right">15,000</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">
//                       Máy tính bảng iPad Pro 12.9
//                     </TableCell>
//                     <TableCell className="text-center">30</TableCell>
//                     <TableCell className="text-right">36,000</TableCell>
//                     <TableCell className="text-right">9,000</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">
//                       Tivi Samsung 55 inch
//                     </TableCell>
//                     <TableCell className="text-center">20</TableCell>
//                     <TableCell className="text-right">24,000</TableCell>
//                     <TableCell className="text-right">6,000</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="text-right mt-4">
//         <ShinyRotatingBorderButton>Xuất báo cáo</ShinyRotatingBorderButton>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";

// Các cấu hình chart
const chartConfig = {
    Doanh_thu: {
        label: "Doanh thu",
        color: "hsl(var(--chart-1))",
    },
    Loi_nhuan: {
        label: "Lợi nhuận",
        color: "hsl(var(--chart-2))",
    },
};

function DatePicker({
    label,
    date,
    setDate,
}: {
    label: string;
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
    return (
        <div className="mb-4">
            <label className="block text-dark mb-2">{label}</label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-black-200">
                        <span className="mr-2 h-4 w-4">📅</span>
                        {date ? format(date, "PPP") : "Chọn ngày"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default function RevenueReport() {
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [chartData, setChartData] = useState<any[]>([]);
    const [viewMode, setViewMode] = useState<"day" | "month" | "year">("day");

    // Hàm gửi request API để lấy dữ liệu
    const fetchData = async () => {
        if (startDate && endDate) {
            const start = format(startDate, "yyyy-MM-dd");
            const end = format(endDate, "yyyy-MM-dd");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/revenue?startDate=${start}&endDate=${end}`);
            const data = await response.json();
            console.log(data); // Kiểm tra dữ liệu từ API

            // Chuyển đổi dữ liệu thành dạng ngày, tháng, hoặc năm
            const handleDataFormatting = (data: any[]) => {
                const formattedData = formatChartData(data, viewMode);
                console.log(formattedData);  // Kiểm tra dữ liệu sau khi được xử lý
                setChartData(formattedData);
            };

            // Gọi handleDataFormatting với dữ liệu từ API
            handleDataFormatting(data);
        }
    };

    // Hàm chuyển đổi dữ liệu
    const formatChartData = (data: any[], viewMode: string) => {
        let formattedData: any[] = [];
    
        // Lọc bỏ các mục không hợp lệ (có orderDate là "Total")
        const validData = data.filter(item => item.orderDate !== "Total");
    
        if (viewMode === "day") {
            formattedData = validData.map((item) => ({
                date: format(new Date(item.orderDate), "yyyy-MM-dd"),
                Doanh_thu: item.totalAmount,
                Loi_nhuan: item.totalProfit,
            }));
        } else if (viewMode === "month") {
            formattedData = validData.map((item) => ({
                date: format(new Date(item.orderDate), "MMM yyyy"),
                Doanh_thu: item.totalAmount,
                Loi_nhuan: item.totalProfit,
            }));
        } else if (viewMode === "year") {
            formattedData = validData.map((item) => ({
                date: format(new Date(item.orderDate), "yyyy"),
                Doanh_thu: item.totalAmount,
                Loi_nhuan: item.totalProfit,
            }));
        }
    
        return formattedData;
    };

    // Hàm xử lý khi người dùng chọn "Áp dụng"
    const handleApply = () => {
        fetchData();
    };

    // Hàm xử lý lựa chọn chế độ hiển thị theo ngày, tháng, năm
    const handleViewModeChange = (mode: "day" | "month" | "year") => {
        setViewMode(mode);
    };

    // Gọi fetchData mỗi khi startDate, endDate hoặc viewMode thay đổi
    useEffect(() => {
        if (startDate && endDate) {
            fetchData();
        }
    }, [startDate, endDate, viewMode]);

    return (
        <div className="bg-backgroundAdmin-bg min-h-screen p-6 text-white rounded-xl">
            <h1 className="text-center text-2xl font-bold mb-6">BÁO CÁO DOANH THU VÀ LỢI NHUẬN</h1>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                    <div className="space-y-4 bg-black/40 rounded-xl p-4">
                        <button className="w-full border border-white/30 py-2 bg-transparent rounded-xl">Lọc theo thời gian</button>
                        <button className="w-full border border-white/30 py-2 bg-transparent rounded-xl">Tổng doanh thu</button>
                        <button className="w-full border border-white/30 py-2 bg-transparent rounded-xl">Tổng chi phí</button>
                        <button className="w-full border border-white/30 py-2 bg-transparent rounded-xl">Tổng lợi nhuận</button>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-black/40 rounded-md">
                            <h2 className="text-lg font-bold mb-4 text-white">Lọc theo thời gian</h2>
                            <form>
                                <DatePicker label="Từ ngày:" date={startDate} setDate={setStartDate} />
                                <DatePicker label="Đến ngày:" date={endDate} setDate={setEndDate} />
                                <ShinyRotatingBorderButton onClick={handleApply}>Áp dụng</ShinyRotatingBorderButton>
                            </form>
                            <div className="mt-4 flex justify-between">
                                <Button onClick={() => handleViewModeChange("day")}>Theo ngày</Button>
                                <Button onClick={() => handleViewModeChange("month")}>Theo tháng</Button>
                                <Button onClick={() => handleViewModeChange("year")}>Theo năm</Button>
                            </div>
                        </div>
                        <div className="p-4 bg-black/40 rounded-md">
                            <h2 className="text-lg font-bold mb-4 text-white">Biểu đồ doanh thu và lợi nhuận</h2>
                            {chartData.length > 0 ? (
                                <BarChart data={chartData} width={600} height={300}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} />
                                    <YAxis tickLine={false} axisLine={false} />
                                    <Bar dataKey="Doanh_thu" fill={chartConfig.Doanh_thu.color} radius={4} />
                                    <Bar dataKey="Loi_nhuan" fill={chartConfig.Loi_nhuan.color} radius={4} />
                                </BarChart>
                            ) : (
                                <p className="text-center text-white">Không có dữ liệu để hiển thị</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
