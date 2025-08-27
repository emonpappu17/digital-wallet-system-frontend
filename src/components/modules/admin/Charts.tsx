// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { BarChart, XAxis, YAxis } from "recharts";

// const Charts = () => {
//     // Pie chart data
//     const pieData = [
//         {
//             type: "ADD_MONEY",
//             value: 17000,
//             percentage: 48.21,
//             count: 23,
//             fees: 0,
//             commission: 0
//         },
//         {
//             type: "CASH_OUT",
//             value: 13204,
//             percentage: 37.44,
//             count: 13,
//             fees: 244.274,
//             commission: 132.04
//         },
//         {
//             type: "SEND_MONEY",
//             value: 3570,
//             percentage: 10.12,
//             count: 34,
//             fees: 0,
//             commission: 0
//         },
//         {
//             type: "CASH_IN",
//             value: 1489,
//             percentage: 4.22,
//             count: 12,
//             fees: 0,
//             commission: 14.89
//         }
//     ];

//     // Bar chart data
//     const barData = [
//         {
//             date: "2025-08-24",
//             totalAmount: 170,
//             totalCount: 4,
//             CASH_OUT: 70,
//             CASH_IN: 100,
//             ADD_MONEY: 0,
//             SEND_MONEY: 0
//         },
//         {
//             date: "2025-08-25",
//             totalAmount: 924,
//             totalCount: 5,
//             CASH_IN: 924,
//             CASH_OUT: 0,
//             ADD_MONEY: 0,
//             SEND_MONEY: 0
//         },
//         {
//             date: "2025-08-26",
//             totalAmount: 11281,
//             totalCount: 45,
//             SEND_MONEY: 2970,
//             ADD_MONEY: 5900,
//             CASH_IN: 211,
//             CASH_OUT: 2200
//         },
//         {
//             date: "2025-08-27",
//             totalAmount: 22888,
//             totalCount: 28,
//             SEND_MONEY: 600,
//             CASH_IN: 254,
//             ADD_MONEY: 11100,
//             CASH_OUT: 10934
//         }
//     ];

//     // Color palette for charts
//     const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];
//     const barColors = {
//         ADD_MONEY: '#8884d8',
//         CASH_OUT: '#82ca9d',
//         SEND_MONEY: '#ffc658',
//         CASH_IN: '#ff7300'
//     };

//     // Custom tooltip for pie chart
//     const PieTooltip = ({ active, payload }) => {
//         if (active && payload && payload[0]) {
//             const data = payload[0].payload;
//             return (
//                 <div className="bg-white p-3 border rounded-lg shadow-lg">
//                     <p className="font-semibold">{typeof data.type === 'string' ? data.type.replace('_', ' ') : data.type}</p>
//                     <p className="text-sm">Value: ${data.value.toLocaleString()}</p>
//                     <p className="text-sm">Percentage: {data.percentage}%</p>
//                     <p className="text-sm">Count: {data.count} transactions</p>
//                     {data.fees > 0 && <p className="text-sm">Fees: ${data.fees.toFixed(2)}</p>}
//                     {data.commission > 0 && <p className="text-sm">Commission: ${data.commission.toFixed(2)}</p>}
//                 </div>
//             );
//         }
//         return null;
//     };

//     // Custom tooltip for bar chart
//     const BarTooltip = ({ active, payload, label }) => {
//         if (active && payload && payload.length) {
//             return (
//                 <div className="bg-white p-3 border rounded-lg shadow-lg">
//                     <p className="font-semibold">{new Date(label).toLocaleDateString()}</p>
//                     {payload.map((entry, index) => (
//                         entry.value > 0 && (
//                             <p key={index} className="text-sm" style={{ color: entry.color }}>
//                                 {entry.dataKey.replace('_', ' ')}: ${entry.value.toLocaleString()}
//                             </p>
//                         )
//                     ))}
//                     <p className="text-sm font-medium border-t pt-1 mt-1">
//                         Total: ${payload[0]?.payload?.totalAmount?.toLocaleString()}
//                     </p>
//                 </div>
//             );
//         }
//         return null;
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     return (
//         <div className="w-full max-w-7xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
//             <div className="text-center mb-8">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction Analytics</h1>
//                 <p className="text-gray-600">Overview of your transaction data from Aug 24-27, 2025</p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Pie Chart Card */}
//                 <Card className="shadow-lg">
//                     <CardHeader>
//                         <CardTitle className="flex items-center gap-2">
//                             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                             Transaction Distribution
//                         </CardTitle>
//                         <CardDescription>
//                             Breakdown by transaction type • Total: $35,263
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="h-80">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <PieChart>
//                                     <Pie
//                                         data={pieData}
//                                         cx="50%"
//                                         cy="50%"
//                                         labelLine={false}
//                                         label={({ percentage }) => `${percentage}%`}
//                                         outerRadius={100}
//                                         fill="#8884d8"
//                                         dataKey="value"
//                                     >
//                                         {pieData.map((entry, index) => (
//                                             <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
//                                         ))}
//                                     </Pie>
//                                     <Tooltip content={<PieTooltip />} />
//                                     <Legend
//                                         formatter={(value) => typeof value === 'string' ? value.replace('_', ' ') : value}
//                                         wrapperStyle={{ paddingTop: '20px' }}
//                                     />
//                                 </PieChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 {/* Summary Stats Card */}
//                 <Card className="shadow-lg">
//                     <CardHeader>
//                         <CardTitle className="flex items-center gap-2">
//                             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                             Key Metrics
//                         </CardTitle>
//                         <CardDescription>
//                             Transaction summary statistics
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="grid grid-cols-2 gap-4 h-80">
//                             {pieData.map((item, index) => (
//                                 <div key={item.type} className="p-4 rounded-lg border-l-4" style={{ borderLeftColor: pieColors[index] }}>
//                                     <div className="text-sm font-medium text-gray-600 mb-1">
//                                         {typeof item.type === 'string' ? item.type.replace('_', ' ') : item.type}
//                                     </div>
//                                     <div className="text-2xl font-bold text-gray-900 mb-2">
//                                         ${item.value.toLocaleString()}
//                                     </div>
//                                     <div className="text-xs text-gray-500 space-y-1">
//                                         <div>{item.count} transactions</div>
//                                         <div>{item.percentage}% of total</div>
//                                         {item.fees > 0 && <div>Fees: ${item.fees.toFixed(2)}</div>}
//                                         {item.commission > 0 && <div>Commission: ${item.commission.toFixed(2)}</div>}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>

//             {/* Bar Chart Card */}
//             <Card className="shadow-lg">
//                 <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                         Daily Transaction Trends
//                     </CardTitle>
//                     <CardDescription>
//                         Transaction amounts by type over time • Aug 24-27, 2025
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="h-96">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                                 <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
//                                 <XAxis
//                                     dataKey="date"
//                                     tickFormatter={formatDate}
//                                     className="text-sm"
//                                 />
//                                 <YAxis
//                                     tickFormatter={(value) => `$${value.toLocaleString()}`}
//                                     className="text-sm"
//                                 />
//                                 <Tooltip content={<BarTooltip />} />
//                                 <Legend
//                                     formatter={(value) => typeof value === 'string' ? value.replace('_', ' ') : value}
//                                     wrapperStyle={{ paddingTop: '20px' }}
//                                 />
//                                 <Bar dataKey="ADD_MONEY" stackId="a" fill={barColors.ADD_MONEY} name="ADD_MONEY" />
//                                 <Bar dataKey="CASH_OUT" stackId="a" fill={barColors.CASH_OUT} name="CASH_OUT" />
//                                 <Bar dataKey="SEND_MONEY" stackId="a" fill={barColors.SEND_MONEY} name="SEND_MONEY" />
//                                 <Bar dataKey="CASH_IN" stackId="a" fill={barColors.CASH_IN} name="CASH_IN" />
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default Charts;


// PieChartComponent.tsx

// import {
//     ChartConfig,
//     ChartContainer,
//     ChartLegend,
//     ChartLegendContent,
//     ChartTooltip,
//     ChartTooltipContent,
// } from "@/components/ui/chart"
// import { Pie, PieChart } from "recharts"

// const chartData = [
//     { name: "ADD_MONEY", value: 17000, fill: "var(--color-add_money)" },
//     { name: "CASH_OUT", value: 13204, fill: "var(--color-cash_out)" },
//     { name: "SEND_MONEY", value: 3570, fill: "var(--color-send_money)" },
//     { name: "CASH_IN", value: 1489, fill: "var(--color-cash_in)" },
// ]

// const chartConfig = {
//     add_money: {
//         label: "ADD_MONEY",
//         color: "hsl(var(--chart-1))",
//     },
//     cash_out: {
//         label: "CASH_OUT",
//         color: "hsl(var(--chart-2))",
//     },
//     send_money: {
//         label: "SEND_MONEY",
//         color: "hsl(var(--chart-3))",
//     },
//     cash_in: {
//         label: "CASH_IN",
//         color: "hsl(var(--chart-4))",
//     },
// } satisfies ChartConfig

// export function Charts() {
//     return (
//         <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
//             <PieChart accessibilityLayer>
//                 <Pie data={chartData} dataKey="value" nameKey="name" />
//                 <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
//                 <ChartLegend
//                     content={<ChartLegendContent nameKey="name" />}
//                     className="flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
//                 />
//             </PieChart>
//         </ChartContainer>
//     )
// }


// BarChartComponent.tsx


// import {
//     Bar,
//     BarChart,
//     CartesianGrid,
//     ChartConfig,
//     ChartContainer,
//     ChartLegend,
//     ChartLegendContent,
//     ChartTooltip,
//     ChartTooltipContent,
//     XAxis,
//     YAxis,
// } from "@/components/ui/chart"

// const chartData = [
//     {
//         date: "2025-08-24",
//         CASH_OUT: 70,
//         CASH_IN: 100,
//     },
//     {
//         date: "2025-08-25",
//         CASH_IN: 924,
//     },
//     {
//         date: "2025-08-26",
//         SEND_MONEY: 2970,
//         ADD_MONEY: 5900,
//         CASH_IN: 211,
//         CASH_OUT: 2200,
//     },
//     {
//         date: "2025-08-27",
//         SEND_MONEY: 600,
//         CASH_IN: 254,
//         ADD_MONEY: 11100,
//         CASH_OUT: 10934,
//     },
// ]

// const chartConfig = {
//     ADD_MONEY: {
//         label: "ADD_MONEY",
//         color: "hsl(var(--chart-1))",
//     },
//     CASH_OUT: {
//         label: "CASH_OUT",
//         color: "hsl(var(--chart-2))",
//     },
//     SEND_MONEY: {
//         label: "SEND_MONEY",
//         color: "hsl(var(--chart-3))",
//     },
//     CASH_IN: {
//         label: "CASH_IN",
//         color: "hsl(var(--chart-4))",
//     },
// } satisfies ChartConfig

// export function Charts() {
//     return (
//         <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
//             <BarChart accessibilityLayer data={chartData}>
//                 <CartesianGrid vertical={false} />
//                 <XAxis
//                     dataKey="date"
//                     tickLine={false}
//                     tickMargin={10}
//                     axisLine={false}
//                 />
//                 <YAxis tickLine={false} tickMargin={10} axisLine={false} />
//                 <ChartTooltip content={<ChartTooltipContent />} />
//                 <ChartLegend content={<ChartLegendContent />} />
//                 <Bar dataKey="ADD_MONEY" stackId="a" fill="var(--color-ADD_MONEY)" radius={4} />
//                 <Bar dataKey="CASH_OUT" stackId="a" fill="var(--color-CASH_OUT)" radius={4} />
//                 <Bar dataKey="SEND_MONEY" stackId="a" fill="var(--color-SEND_MONEY)" radius={4} />
//                 <Bar dataKey="CASH_IN" stackId="a" fill="var(--color-CASH_IN)" radius={4} />
//             </BarChart>
//         </ChartContainer>
//     )
// }




// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//     Bar,
//     Cell,
//     Legend,
//     Pie,
//     PieChart,
//     ResponsiveContainer,
//     Tooltip
// } from "recharts";

// // --- Data (copied from your payload) ---
// const pieData = [
//     { type: "ADD_MONEY", value: 17000, percentage: 48.21, count: 23, fees: 0, commission: 0 },
//     { type: "CASH_OUT", value: 13204, percentage: 37.44, count: 13, fees: 244.274, commission: 132.04000000000002 },
//     { type: "SEND_MONEY", value: 3570, percentage: 10.12, count: 34, fees: 0, commission: 0 },
//     { type: "CASH_IN", value: 1489, percentage: 4.22, count: 12, fees: 0, commission: 14.89 },
// ];

// const barData = [
//     { date: "2025-08-24", totalAmount: 170, totalCount: 4, CASH_OUT: 70, CASH_IN: 100 },
//     { date: "2025-08-25", totalAmount: 924, totalCount: 5, CASH_IN: 924 },
//     { date: "2025-08-26", totalAmount: 11281, totalCount: 45, SEND_MONEY: 2970, ADD_MONEY: 5900, CASH_IN: 211, CASH_OUT: 2200 },
//     { date: "2025-08-27", totalAmount: 22888, totalCount: 28, SEND_MONEY: 600, CASH_IN: 254, ADD_MONEY: 11100, CASH_OUT: 10934 },
// ];

// const PIE_COLORS = ["#10B981", "#EF4444", "#3B82F6", "#F59E0B"]; // green, red, blue, amber
// const BAR_COLORS: Record<string, string> = {
//     ADD_MONEY: "#10B981",
//     CASH_OUT: "#EF4444",
//     SEND_MONEY: "#3B82F6",
//     CASH_IN: "#F59E0B",
// };

// export default function TransactionsCharts() {
//     return (
//         <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
//             {/* Pie Chart Card */}
//             <Card className="min-h-[320px]">
//                 <CardHeader>
//                     <CardTitle>Transaction Mix (by value)</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div style={{ width: "100%", height: 320 }}>
//                         <ResponsiveContainer>
//                             <PieChart>
//                                 <Pie
//                                     data={pieData}
//                                     dataKey="value"
//                                     nameKey="type"
//                                     outerRadius={110}
//                                     innerRadius={50}
//                                     paddingAngle={3}
//                                     label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}
//                                 >
//                                     {pieData.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
//                                     ))}
//                                 </Pie>
//                                 <Tooltip formatter={(value: number) => new Intl.NumberFormat().format(value)} />
//                                 <Legend />
//                             </PieChart>
//                         </ResponsiveContainer>
//                     </div>
//                     <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
//                         {pieData.map((p) => (
//                             <div key={p.type} className="flex items-center gap-2">
//                                 <span
//                                     className="w-3 h-3 rounded"
//                                     style={{ background: PIE_COLORS[pieData.findIndex((x) => x.type === p.type) % PIE_COLORS.length] }}
//                                 />
//                                 <div>
//                                     <div className="font-medium">{p.type}</div>
//                                     <div className="text-muted-foreground text-xs">{p.count} tx • {p.percentage}% • {new Intl.NumberFormat().format(p.value)}</div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </CardContent>
//             </Card>

//             {/* Bar Chart Card */}
//             <Card className="min-h-[320px]">
//                 <CardHeader>
//                     <CardTitle>Daily Activity</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div style={{ width: "100%", height: 320 }}>
//                         <ResponsiveContainer>
//                             <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//                                 <XAxis dataKey="date" />
//                                 <YAxis />
//                                 <Tooltip formatter={(value: number) => new Intl.NumberFormat().format(value)} />
//                                 <Legend />

//                                 {/* Stacked bars for each transaction type (only render a Bar if a key exists in the data) */}
//                                 <Bar dataKey="ADD_MONEY" stackId="a" fill={BAR_COLORS.ADD_MONEY} />
//                                 <Bar dataKey="CASH_OUT" stackId="a" fill={BAR_COLORS.CASH_OUT} />
//                                 <Bar dataKey="SEND_MONEY" stackId="a" fill={BAR_COLORS.SEND_MONEY} />
//                                 <Bar dataKey="CASH_IN" stackId="a" fill={BAR_COLORS.CASH_IN} />
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>

//                     <div className="mt-4 text-sm grid grid-cols-2 gap-2">
//                         {Object.entries(BAR_COLORS).map(([k, color]) => (
//                             <div key={k} className="flex items-center gap-2">
//                                 <span className="w-3 h-3 rounded" style={{ background: color }} />
//                                 <div>{k}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }
