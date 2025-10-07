import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { Calendar } from "lucide-react";

export function ContractSummaryCard() {
  const [timeRange, setTimeRange] = useState("7d");

  // Donut chart data for contract overview
  const contractOverviewData = [
    {
      name: "จำนวนสัญญาทั้งหมดจาก Simplicity",
      value: 2384,
      percentage: 100,
      color: "#0471d1"
    },
    {
      name: "จำนวนสัญญาที่ได้รับการตรวจโดยระบบ LOI Autocheck",
      value: 1847,
      percentage: 77.5,
      color: "#fbc41e"
    }
  ];

  // Generate time-based contract status data
  const generateStatusData = (days: number) => {
    const statuses = ['อนุมัติ', 'ไม่อนุมัติ', 'อยู่ระหว่างการตรวจสอบ', 'TBC_1', 'TBC_2', 'TBC_3', 'TBC_4'];
    const colors = ['#10b981', '#ef4444', '#f59e0b', '#6b7280', '#9ca3af', '#d1d5db', '#f3f4f6'];
    
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      
      const entry: any = {
        date: date.toLocaleDateString('th-TH', { month: 'short', day: 'numeric' }),
        fullDate: date.toLocaleDateString('th-TH', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      };

      // Generate realistic status distribution
      const baseValues = [120, 15, 45, 12, 8, 5, 3]; // Base values for each status
      statuses.forEach((status, idx) => {
        entry[status] = Math.floor(baseValues[idx] + Math.random() * 20 - 10);
      });

      return entry;
    });
  };

  const statusData = generateStatusData(timeRange === "7d" ? 7 : timeRange === "30d" ? 15 : 30);

  const statusColors = {
    'อนุมัติ': '#10b981',
    'ไม่อนุมัติ': '#ef4444',
    'อยู่ระหว่างการตรวจสอบ': '#f59e0b',
    'TBC_1': '#6b7280',
    'TBC_2': '#9ca3af',
    'TBC_3': '#d1d5db',
    'TBC_4': '#f3f4f6'
  };

  // Generate time series data for contract trends
  const generateContractTrendData = (days: number) => {
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));

      // Generate realistic trend data with slight variations
      const totalBase = 2384;
      const checkedBase = 1847;
      const variation = Math.random() * 200 - 100;

      return {
        date: date.toLocaleDateString('th-TH', { month: 'short', day: 'numeric' }),
        fullDate: date.toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        totalContracts: Math.floor(totalBase + variation),
        checkedContracts: Math.floor(checkedBase + (variation * 0.775))
      };
    });
  };

  const contractTrendData = generateContractTrendData(timeRange === "7d" ? 7 : timeRange === "30d" ? 15 : 30);

  // Custom tooltip for donut chart
  const DonutTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{data.name}</p>
          <p className="text-lg font-bold text-[#0471d1]">
            {data.value.toLocaleString()} สัญญา
          </p>
          <p className="text-xs text-muted-foreground">
            {data.percentage}% ของทั้งหมด
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for line chart
  const LineTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">{payload[0].payload.fullDate}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: entry.color }}
                />
                <span>{entry.name}</span>
              </div>
              <span className="font-medium">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for bar chart
  const BarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">{payload[0].payload.fullDate}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: entry.color }}
                />
                <span>{entry.dataKey}</span>
              </div>
              <span className="font-medium">{entry.value}</span>
            </div>
          ))}
          <div className="border-t border-border mt-2 pt-2 text-xs font-medium">
            รวม: {total} สัญญา
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            <div>
              <div className="text-foreground">สรุปสถานะสัญญา</div>
              <div className="text-sm text-muted-foreground mt-1">Contract Status Summary</div>
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-24 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 วัน</SelectItem>
                <SelectItem value="30d">30 วัน</SelectItem>
                <SelectItem value="90d">90 วัน</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Big Numbers + Donut Chart */}
          <div className="space-y-4">
            {/* Big Numbers Section - Above Donut Chart */}
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 rounded-lg bg-gradient-to-br from-[#0471d1]/10 to-[#0471d1]/5 border border-[#0471d1]/20">
                <div className="text-lg font-bold text-[#0471d1] mb-1">
                  {contractOverviewData[0].value.toLocaleString()}
                </div>
                <div className="text-xs font-medium text-foreground mb-0.5 leading-tight">
                  จำนวนสัญญาทั้งหมดจาก Simplicity
                </div>
                <div className="text-xs text-muted-foreground">
                  Total Contracts from Simplicity
                </div>
              </div>
              
              <div className="text-center p-2 rounded-lg bg-gradient-to-br from-[#fbc41e]/10 to-[#fbc41e]/5 border border-[#fbc41e]/20">
                <div className="text-lg font-bold text-[#fbc41e] mb-1">
                  {contractOverviewData[1].value.toLocaleString()}
                </div>
                <div className="text-xs font-medium text-foreground mb-0.5 leading-tight">
                  จำนวนสัญญาที่ได้รับการตรวจโดยระบบ LOI Autocheck
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  Contracts Checked by LOI Autocheck System
                </div>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-[#fbc41e]/20 text-[#fbc41e]">
                  {contractOverviewData[1].percentage}% ของทั้งหมด
                </span>
              </div>
            </div>

            {/* Donut Chart and Line Chart Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">ภาพรวมสัญญา</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Donut Chart */}
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={contractOverviewData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {contractOverviewData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<DonutTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Time Series Line Chart */}
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={contractTrendData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-muted-foreground/20" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 9 }}
                        stroke="currentColor"
                        className="text-muted-foreground"
                      />
                      <YAxis
                        tick={{ fontSize: 9 }}
                        stroke="currentColor"
                        className="text-muted-foreground"
                      />
                      <Tooltip content={<LineTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="totalContracts"
                        stroke="#0471d1"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        name="Total Simplicity"
                      />
                      <Line
                        type="monotone"
                        dataKey="checkedContracts"
                        stroke="#fbc41e"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        name="Checked by LOI"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Compact Legend */}
              <div className="space-y-2">
                {contractOverviewData.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs">
                    <div
                      className="w-3 h-3 rounded-sm mt-0.5 flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1">
                      <div className="text-foreground leading-tight line-clamp-2">{item.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stacked Bar Chart Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">สถานะสัญญารายเวลา</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-muted-foreground/20" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }}
                    stroke="currentColor"
                    className="text-muted-foreground"
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }}
                    stroke="currentColor"
                    className="text-muted-foreground"
                    label={{ 
                      value: 'จำนวนสัญญา', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fontSize: '10px' }
                    }}
                  />
                  <Tooltip content={<BarTooltip />} />
                  
                  {Object.entries(statusColors).map(([status, color]) => (
                    <Bar 
                      key={status}
                      dataKey={status} 
                      stackId="status"
                      fill={color}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Compact Status Legend */}
            <div className="grid grid-cols-2 gap-1">
              {Object.entries(statusColors).map(([status, color]) => (
                <div key={status} className="flex items-center gap-1 text-xs">
                  <div 
                    className="w-2 h-2 rounded-sm flex-shrink-0" 
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-foreground truncate">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}