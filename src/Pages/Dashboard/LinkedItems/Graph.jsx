"use client"
import { BarChart, Bar, XAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const Graph = () => {
  const salesData = [
    { month: "01", lastWeek: 45, last6Days: 55 },
    { month: "02", lastWeek: 35, last6Days: 40 },
    { month: "03", lastWeek: 40, last6Days: 45 },
    { month: "04", lastWeek: 30, last6Days: 35 },
    { month: "05", lastWeek: 50, last6Days: 60 },
    { month: "06", lastWeek: 45, last6Days: 70 },
    { month: "07", lastWeek: 35, last6Days: 55 },
    { month: "08", lastWeek: 60, last6Days: 45 },
    { month: "09", lastWeek: 40, last6Days: 50 },
    { month: "10", lastWeek: 35, last6Days: 40 },
    { month: "11", lastWeek: 45, last6Days: 65 },
    { month: "12", lastWeek: 50, last6Days: 75 },
  ]

  // Sample data for the donut chart
  const topSalesData = [
    { name: "10138 SHOOT CAKE WOLF 40%", value: 40, color: "#FF4444" },
    { name: "10138 SHOOT CAKE WOLF 32%", value: 32, color: "#FF6B6B" },
    { name: "10138 SHOOT CAKE WOLF 30%", value: 30, color: "#FFB3B3" },
  ]

  return (
    <div className=" bg-rose-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  mx-auto">
        {/* Sales By Month Card */}
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-medium text-[#F04E24] mb-2">Sales By Month</h2>
                <div className="text-4xl font-bold text-[#F04E24] mb-2">785</div>
                <div className="flex items-center text-sm">
                  <span className="text-green-500 mr-1">↗</span>
                  <span className="text-green-500 font-medium">2.1%</span>
                  <span className="text-gray-500 ml-1">vs last week</span>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500 mb-4">Sales from 1-12 Dec, 2024</div>

            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} barCategoryGap="20%">
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                  <Bar dataKey="last6Days" fill="#F04E24" radius={[2, 2, 0, 0]} maxBarSize={20} />
                  <Bar dataKey="lastWeek" fill="#E5E7EB" radius={[2, 2, 0, 0]} maxBarSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-600">Last 6 days</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <span className="text-gray-600">Last Week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Sales Item Card */}
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-medium text-[#F04E24] mb-2">Top 3 Sales Item</h2>
                <div className="text-sm text-gray-500">From 1-6 Dec, 2024</div>
              </div>
              <button className=" bg-[#FFE4DF] px-2 rounded-[5px] hover:bg-[#f8d0c8] font-medium py-[4px]  text-[14px] hover:cursor-pointer border border-[#F04E24]  text-[#F04E24] border-none">View Report</button>
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute z-[9999] w-[200px] top-4 left-1/2 transform -translate-x-1/2 bg-[#F04E24] text-white px-3 py-1 rounded text-xs font-medium">
                  10138 SHOOT CAKE WOLF 40%
                </div>
                <div className="h-48 w-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topSalesData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        startAngle={90}
                        endAngle={450}
                      >
                        {topSalesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {topSalesData.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Graph
