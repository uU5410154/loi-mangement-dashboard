import { TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, FileText, Target, Bot, Users, BarChart3, Eye, Database, Timer, AlertTriangle, Activity, Zap, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { useState } from "react";

interface KPICardProps {
  title: string;
  subtitle: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon: React.ReactNode;
  trend?: number[];
  color?: 'blue' | 'yellow' | 'green' | 'red' | 'gray';
}

function KPICard({ title, subtitle, value, change, icon, trend, color = 'blue' }: KPICardProps) {
  const colorClasses = {
    blue: 'text-[#0471d1] bg-[#0471d1]/10',
    yellow: 'text-[#fbc41e] bg-[#fbc41e]/10',
    green: 'text-green-600 bg-green-50 dark:bg-green-900/20',
    red: 'text-red-600 bg-red-50 dark:bg-red-900/20',
    gray: 'text-gray-600 bg-gray-50 dark:bg-gray-800'
  };

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <div>
            <div className="text-foreground">{title}</div>
            <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
          </div>
        </CardTitle>
        <div className={`rounded-md p-2 ${colorClasses[color]}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">{value}</div>
          {change && (
            <div className="flex items-center gap-1">
              {change.type === 'increase' ? (
                <TrendingUp className="h-3 w-3 text-[#0471d1]" />
              ) : (
                <TrendingDown className="h-3 w-3 text-[#fbc41e]" />
              )}
              <span className={`text-xs ${change.type === 'increase' ? 'text-[#0471d1]' : 'text-[#fbc41e]'}`}>
                {change.value > 0 ? '+' : ''}{change.value}%
              </span>
            </div>
          )}
        </div>
        {change && (
          <p className="text-xs text-muted-foreground mt-1">
            vs {change.period}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// Gauge Component
function GaugeChart({ value, max, label, color = "#0471d1" }: { value: number; max: number; label: string; color?: string }) {
  const percentage = (value / max) * 100;
  const strokeDasharray = `${percentage * 2.51} 251`;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 84 84">
          <circle
            cx="42"
            cy="42"
            r="40"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-muted-foreground/20"
          />
          <circle
            cx="42"
            cy="42"
            r="40"
            stroke={color}
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold">{value.toFixed(1)}%</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground mt-1">{label}</span>
    </div>
  );
}

// Mini Chart Component
function MiniChart({ data, type = "line", color = "#0471d1" }: { data: any[]; type?: "line" | "bar" | "area"; color?: string }) {
  return (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        {type === "line" && (
          <LineChart data={data}>
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        )}
        {type === "bar" && (
          <BarChart data={data}>
            <Bar dataKey="value" fill={color} />
          </BarChart>
        )}
        {type === "area" && (
          <AreaChart data={data}>
            <Area type="monotone" dataKey="value" stroke={color} fill={color} fillOpacity={0.2} />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export function KPICards() {
  const [timeRange, setTimeRange] = useState("7d");
  
  // Generate mock trend data based on time range
  const generateTrendData = (days: number) => {
    return Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      value: Math.floor(Math.random() * 100) + 50
    }));
  };
  // Contract Quantity Metrics
  const contractQuantityData = [
    {
      title: "จำนวนสัญญาทั้งหมดจาก Simplicity",
      subtitle: "Total Contracts from Simplicity",
      value: "2,384",
      change: { value: 5.2, type: 'increase' as const, period: 'last week' },
      icon: <Database className="h-4 w-4" />,
      color: 'blue' as const
    },
    {
      title: "ตรวจโดยระบบ LOI Autocheck",
      subtitle: "Checked by LOI Autocheck",
      value: "1,847",
      change: { value: 8.7, type: 'increase' as const, period: 'last week' },
      icon: <Eye className="h-4 w-4" />,
      color: 'blue' as const
    },
    {
      title: "อนุมัติ",
      subtitle: "Approved",
      value: "892",
      change: { value: 12.3, type: 'increase' as const, period: 'last week' },
      icon: <CheckCircle className="h-4 w-4" />,
      color: 'green' as const
    },
    {
      title: "ไม่อนุมัติ",
      subtitle: "Not Approved",
      value: "124",
      change: { value: -15.2, type: 'decrease' as const, period: 'last week' },
      icon: <XCircle className="h-4 w-4" />,
      color: 'red' as const
    },
    {
      title: "อยู่ระหว่างการตรวจสอบ",
      subtitle: "Under Review",
      value: "347",
      change: { value: -3.4, type: 'decrease' as const, period: 'last week' },
      icon: <AlertTriangle className="h-4 w-4" />,
      color: 'yellow' as const
    },
    {
      title: "TBC_1",
      subtitle: "To Be Confirmed 1",
      value: "89",
      change: { value: 2.1, type: 'increase' as const, period: 'last week' },
      icon: <FileText className="h-4 w-4" />,
      color: 'gray' as const
    },
    {
      title: "TBC_2",
      subtitle: "To Be Confirmed 2",
      value: "67",
      change: { value: -1.8, type: 'decrease' as const, period: 'last week' },
      icon: <FileText className="h-4 w-4" />,
      color: 'gray' as const
    },
    {
      title: "TBC_3",
      subtitle: "To Be Confirmed 3",
      value: "43",
      change: { value: 0.5, type: 'increase' as const, period: 'last week' },
      icon: <FileText className="h-4 w-4" />,
      color: 'gray' as const
    },
    {
      title: "TBC_4",
      subtitle: "To Be Confirmed 4",
      value: "28",
      change: { value: -2.2, type: 'decrease' as const, period: 'last week' },
      icon: <FileText className="h-4 w-4" />,
      color: 'gray' as const
    }
  ];

  // Bot Performance Metrics
  const botPerformanceData = [
    {
      title: "เวลาเฉลี่ยต่อสัญญา",
      subtitle: "Average Time per Contract",
      value: "2.4m",
      change: { value: -12.5, type: 'decrease' as const, period: 'last week' },
      icon: <Timer className="h-4 w-4" />,
      color: 'blue' as const
    },
    {
      title: "ค่าความมั่นใจ OCR เฉลี่ย",
      subtitle: "Average OCR Confidence Level",
      value: "94.7%",
      change: { value: 1.8, type: 'increase' as const, period: 'last week' },
      icon: <Activity className="h-4 w-4" />,
      color: 'green' as const
    },
    {
      title: "อัตราความแม่นยำเฉลี่ย",
      subtitle: "Average Accuracy Rate",
      value: "91.2%",
      change: { value: 2.3, type: 'increase' as const, period: 'last week' },
      icon: <Target className="h-4 w-4" />,
      color: 'green' as const
    },
    {
      title: "การตรวจสอบด้วยมือเฉลี่ย",
      subtitle: "Average Manual Validation",
      value: "18.4%",
      change: { value: -4.7, type: 'decrease' as const, period: 'last week' },
      icon: <Users className="h-4 w-4" />,
      color: 'yellow' as const
    }
  ];

  // Human Performance Metrics
  const humanPerformanceData = [
    {
      title: "Cycle Time: สร้างสัญญา → อนุมัติ/ปฏิเสธ",
      subtitle: "Contract Creation to Decision",
      value: "6.8h",
      change: { value: -8.7, type: 'decrease' as const, period: 'last week' },
      icon: <Clock className="h-4 w-4" />,
      color: 'blue' as const
    },
    {
      title: "Cycle Time: ตรวจสอบ → อนุมัติ/ปฏิเสธ",
      subtitle: "Review to Decision",
      value: "4.2h",
      change: { value: -5.4, type: 'decrease' as const, period: 'last week' },
      icon: <Clock className="h-4 w-4" />,
      color: 'blue' as const
    },
    {
      title: "ผู้รับผิดชอบตาม Category",
      subtitle: "Responsible by Category",
      value: "15",
      change: { value: 0, type: 'increase' as const, period: 'last week' },
      icon: <Users className="h-4 w-4" />,
      color: 'gray' as const
    },
    {
      title: "Backlog ค้างตรวจ",
      subtitle: "Pending Review Backlog",
      value: "187",
      change: { value: -12.1, type: 'decrease' as const, period: 'last week' },
      icon: <BarChart3 className="h-4 w-4" />,
      color: 'yellow' as const
    }
  ];

  // Contract status distribution data
  const contractStatusData = [
    { name: 'Approved', value: 892, color: '#10b981' },
    { name: 'Not Approved', value: 124, color: '#ef4444' },
    { name: 'Under Review', value: 347, color: '#f59e0b' },
    { name: 'TBC_1', value: 89, color: '#6b7280' },
    { name: 'TBC_2', value: 67, color: '#6b7280' },
    { name: 'TBC_3', value: 43, color: '#6b7280' },
    { name: 'TBC_4', value: 28, color: '#6b7280' }
  ];

  const contractTrendData = generateTrendData(timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90);
  const botPerformanceTrendData = generateTrendData(timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90);

  return (
    <div className="space-y-6">
      {/* Time Range Filter */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Time Range:</span>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 วัน</SelectItem>
            <SelectItem value="30d">30 วัน</SelectItem>
            <SelectItem value="90d">90 วัน</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contract Quantity Section */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Contract Quantity</h3>
          <p className="text-sm text-muted-foreground">จำนวนสัญญา</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {contractQuantityData.map((kpi, index) => (
            <KPICard key={`contract-${index}`} {...kpi} />
          ))}
        </div>
        
        {/* Contract Quantity Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {/* Contract Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                <div>
                  <div className="text-foreground">Contract Status Distribution</div>
                  <div className="text-xs text-muted-foreground mt-1">การกระจายสถานะสัญญา</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contractStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {contractStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Contract Volume Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                <div>
                  <div className="text-foreground">Contract Volume Trend</div>
                  <div className="text-xs text-muted-foreground mt-1">แนวโน้มปริมาณสัญญา</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={contractTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#0471d1" fill="#0471d1" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Bot Performance Section */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Bot Performance</h3>
          <p className="text-sm text-muted-foreground">ประสิทธิภาพของบอท</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {botPerformanceData.map((kpi, index) => (
            <KPICard key={`bot-${index}`} {...kpi} />
          ))}
        </div>
        
        {/* Bot Performance Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          {/* Performance Gauges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                <div>
                  <div className="text-foreground">Performance Metrics</div>
                  <div className="text-xs text-muted-foreground mt-1">ตัวชี้วัดประสิทธิภาพ</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <GaugeChart value={94.7} max={100} label="OCR Confidence" color="#10b981" />
                <GaugeChart value={91.2} max={100} label="Accuracy Rate" color="#0471d1" />
                <GaugeChart value={18.4} max={100} label="Manual Validation" color="#f59e0b" />
                <GaugeChart value={85.6} max={100} label="Overall Score" color="#8b5cf6" />
              </div>
            </CardContent>
          </Card>

          {/* Processing Time Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                <div>
                  <div className="text-foreground">Processing Time Trend</div>
                  <div className="text-xs text-muted-foreground mt-1">แนวโน้มเวลาประมวลผล</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={botPerformanceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#0471d1" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        
          {/* Top 5 Manual Validation Fields */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                <div>
                  <div className="text-foreground">Top 5 Manual Validation Fields</div>
                  <div className="text-xs text-muted-foreground mt-1">ฟิลด์ที่ต้องตรวจสอบด้วยมือ 5 อันดับแรก</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { field: "Contract Value", thai: "มูลค่าสัญญา", count: 89, percentage: 89 },
                  { field: "Tenant Name", thai: "ชื่อผู้เช่า", count: 76, percentage: 76 },
                  { field: "Lease Duration", thai: "ระยะเวลาเช่า", count: 64, percentage: 64 },
                  { field: "Monthly Rent", thai: "ค่าเช่ารายเดือน", count: 52, percentage: 52 },
                  { field: "Deposit Amount", thai: "เงินประกัน", count: 41, percentage: 41 }
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm">{item.field}</div>
                        <div className="text-xs text-muted-foreground">{item.thai}</div>
                      </div>
                      <Badge variant="outline">{item.count}</Badge>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Human Performance Section */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Human Performance</h3>
          <p className="text-sm text-muted-foreground">ประสิทธิภาพของมนุษย์</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {humanPerformanceData.map((kpi, index) => (
            <KPICard key={`human-${index}`} {...kpi} />
          ))}
        </div>
        
        {/* Human Performance Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {/* Cycle Time Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                <div>
                  <div className="text-foreground">Cycle Time Analysis</div>
                  <div className="text-xs text-muted-foreground mt-1">การวิเคราะห์เวลาดำเนินการ</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { stage: 'Creation to Review', time: 2.6, thai: 'สร้าง → ตรวจ' },
                    { stage: 'Review to Decision', time: 4.2, thai: 'ตรวจ → ตัดสิน' },
                    { stage: 'Total Cycle Time', time: 6.8, thai: 'รวมทั้งหมด' }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name, props) => [
                        `${value} hours`,
                        props.payload.thai
                      ]}
                    />
                    <Bar dataKey="time" fill="#0471d1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Responsibility Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                <div>
                  <div className="text-foreground">Responsibility by Category</div>
                  <div className="text-xs text-muted-foreground mt-1">ความรับผิดชอบตามหมวดหมู่</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: 'Retail', responsible: 'นาย ก', actual: 'นาย ก', workload: 85 },
                  { category: 'Office', responsible: 'นาง ข', actual: 'นาย ค', workload: 92 },
                  { category: 'Industrial', responsible: 'นาย ง', actual: 'นาย ง', workload: 78 },
                  { category: 'Residential', responsible: 'นาง จ', actual: 'นาง จ', workload: 95 }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{item.category}</div>
                        <div className="text-xs text-muted-foreground">
                          รับผิดชอบ: {item.responsible} | ทำงานจริง: {item.actual}
                          {item.responsible !== item.actual && (
                            <span className="text-yellow-600 ml-1">⚠️</span>
                          )}
                        </div>
                      </div>
                      <Badge variant={item.workload > 90 ? "destructive" : "outline"}>
                        {item.workload}%
                      </Badge>
                    </div>
                    <Progress value={item.workload} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Backlog Analysis */}
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                <div>
                  <div className="text-foreground">Backlog Analysis by Tenant Service</div>
                  <div className="text-xs text-muted-foreground mt-1">การวิเคราะห์งานค้างตามประเภทบริการผู้เช่า</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { service: 'Retail', count: 45, priority: 'high', trend: 'increasing' },
                  { service: 'Office', count: 67, priority: 'medium', trend: 'stable' },
                  { service: 'Industrial', count: 23, priority: 'low', trend: 'decreasing' },
                  { service: 'Residential', count: 52, priority: 'medium', trend: 'increasing' }
                ].map((item, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{item.service}</h4>
                      <Badge variant={
                        item.priority === 'high' ? 'destructive' : 
                        item.priority === 'medium' ? 'default' : 'secondary'
                      }>
                        {item.count}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.trend === 'increasing' && <TrendingUp className="h-3 w-3 text-red-500" />}
                      {item.trend === 'decreasing' && <TrendingDown className="h-3 w-3 text-green-500" />}
                      {item.trend === 'stable' && <div className="w-3 h-3 bg-gray-400 rounded-full" />}
                      <span className="text-xs text-muted-foreground capitalize">{item.trend}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}