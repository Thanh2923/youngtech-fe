"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A multiple bar chart"

const chartData = [
  { month: "Jan", Doanh_thu: 186, Loi_nhuan: 80 },
  { month: "Feb", Doanh_thu: 305, Loi_nhuan: 200 },
  { month: "Mar", Doanh_thu: 237, Loi_nhuan: 120 },
  { month: "Apr", Doanh_thu: 73, Loi_nhuan: 190 },
  { month: "May", Doanh_thu: 209, Loi_nhuan: 130 },
  { month: "Jun", Doanh_thu: 214, Loi_nhuan: 140 },
]

const chartConfig = {
  Doanh_thu: {
    label: "Doanh thu",
    color: "hsl(var(--chart-1))",
  },
  Loi_nhuan: {
    label: "Lợi nhuận",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="Doanh_thu" fill="var(--color-Doanh_thu)" radius={4} />
            <Bar dataKey="Loi_nhuan" fill="var(--color-Loi_nhuan)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
