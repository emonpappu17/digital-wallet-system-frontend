/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const chartConfig = {
    ADD_MONEY: {
        label: "Add money",
        color: "var(--chart-1)", // Keep original format
    },
    CASH_OUT: {
        label: "Cash out",
        color: "var(--chart-2)", // Keep original format
    },
    SEND_MONEY: {
        label: "Send money",
        color: "var(--chart-3)", // Keep original format
    },
    CASH_IN: {
        label: "Cash in",
        color: "var(--chart-4)", // Keep original format
    },
    totalCount: {
        label: "TotalTx",
        color: "var(--chart-5)", // Keep original format
    },
} satisfies ChartConfig;

// Fallback colors for pie chart
const pieColors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)'];

export function Charts({ chartData }: { chartData: any }) {
    const barChart = chartData?.barChart?.data;
    const pieChart = chartData?.pieChart?.data;

    // Simple tooltip for pie chart
    const PieTooltip = ({ active, payload }: any) => {
        if (active && payload && payload[0]) {
            const data = payload[0].payload;
            return (
                <div className="bg-background border rounded-lg p-3 shadow-lg">
                    <p className="font-semibold">{data.type?.replace('_', ' ')}</p>
                    <p className="text-sm">Value: ${data.totalAmount?.toLocaleString()}</p>
                    <p className="text-sm">Percentage: {data.percentage}%</p>
                    <p className="text-sm">Count: {data.count} transactions</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="md:flex justify-between items-stretch gap-5 mb-10 space-y-5 md:space-y-0">
            {/* Bar Chart */}
            <Card className="bg-card/40 h-[400px] w-full">
                <CardHeader className="pb-3">
                    <CardTitle>Daily Transaction Trends</CardTitle>
                </CardHeader>
                <CardContent className="h-[320px]">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                        <BarChart accessibilityLayer data={barChart}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    return new Date(value).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                    });
                                }}
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
                </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card className="bg-card/40 h-[400px] w-full">
                <CardHeader className="pb-3">
                    <CardTitle>Transaction Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieChart}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ percentage }) => `${percentage}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="totalAmount"
                            >
                                {pieChart?.map((_entry: any, index: number) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={pieColors[index % pieColors.length]}
                                    />
                                ))}
                            </Pie>
                            <ChartTooltip content={<PieTooltip />} />
                            <Legend
                                formatter={(value) => typeof value === 'string' ? value.replace('_', ' ') : value}
                                wrapperStyle={{ paddingBottom: '10px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}