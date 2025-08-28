/* eslint-disable @typescript-eslint/no-explicit-any */


import { Card } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const chartConfig = {
    ADD_MONEY: {
        label: "Add money",
        color: "#2563eb", // base blue
    },
    CASH_OUT: {
        label: "Cash out",
        color: "#1d4ed8", // darker blue
    },
    SEND_MONEY: {
        label: "Send money",
        color: "#3b82f6", // lighter blue
    },
    CASH_IN: {
        label: "Cash in",
        color: "#60a5fa", // soft light blue
    },
    // totalAmount: {
    //     label: "Total",
    //     color: "#1e40af", // deep blue
    // },
    totalCount: {
        label: "TotalTx",
        color: "#93c5fd", // very light blue
    },
} satisfies ChartConfig;


export function Charts({ chartData }: { chartData: any }) {
    const barChart = chartData?.barChart?.data;
    console.log(barChart);
    return (
        <div className="md:flex justify-between items-center gap-5  my-10 space-y-5 md:space-y-0 ">
            <Card className="bg-card/40 min-h-[200px] w-full">
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={barChart}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis tickLine={false} tickMargin={10} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="ADD_MONEY" stackId="a" fill="var(--color-ADD_MONEY)" radius={4} />
                        <Bar dataKey="CASH_OUT" stackId="a" fill="var(--color-CASH_OUT)" radius={4} />
                        <Bar dataKey="SEND_MONEY" stackId="a" fill="var(--color-SEND_MONEY)" radius={4} />
                        <Bar dataKey="CASH_IN" stackId="a" fill="var(--color-CASH_IN)" radius={4} />
                        <Bar dataKey="totalCount" stackId="a" fill="var(--color-totalCount)" radius={4} />
                        {/* <Bar dataKey="totalAmount" stackId="a" fill="var(--color-totalAmount)" radius={4} /> */}
                    </BarChart>
                </ChartContainer>
            </Card>
            <Card className="bg-card/40 min-h-[200px] w-full">
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={barChart}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis tickLine={false} tickMargin={10} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="ADD_MONEY" stackId="a" fill="var(--color-ADD_MONEY)" radius={4} />
                        <Bar dataKey="CASH_OUT" stackId="a" fill="var(--color-CASH_OUT)" radius={4} />
                        <Bar dataKey="SEND_MONEY" stackId="a" fill="var(--color-SEND_MONEY)" radius={4} />
                        <Bar dataKey="CASH_IN" stackId="a" fill="var(--color-CASH_IN)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </Card>
        </div>
    )
}


