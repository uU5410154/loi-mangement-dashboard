import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";

const submittedVsApprovedData = [
  { week: 'W1', submitted: 1180, approved: 850, rejected: 110 },
  { week: 'W2', submitted: 1220, approved: 890, rejected: 125 },
  { week: 'W3', submitted: 1156, approved: 820, rejected: 95 },
  { week: 'W4', submitted: 1284, approved: 920, rejected: 140 },
  { week: 'W5', submitted: 1195, approved: 875, rejected: 105 },
  { week: 'W6', submitted: 1243, approved: 885, rejected: 118 },
  { week: 'W7', submitted: 1247, approved: 892, rejected: 124 }
];

const cycleTimeData = [
  { week: 'W1', p50: 2.1, p75: 4.8, p90: 8.2 },
  { week: 'W2', p50: 2.3, p75: 4.5, p90: 7.9 },
  { week: 'W3', p50: 2.0, p75: 4.2, p90: 7.5 },
  { week: 'W4', p50: 2.4, p75: 4.9, p90: 8.8 },
  { week: 'W5', p50: 2.2, p75: 4.3, p90: 8.1 },
  { week: 'W6', p50: 2.1, p75: 4.6, p90: 8.0 },
  { week: 'W7', p50: 2.0, p75: 4.2, p90: 7.8 }
];

const slaData = [
  { week: 'W1', missRate: 12.5 },
  { week: 'W2', missRate: 15.2 },
  { week: 'W3', missRate: 8.9 },
  { week: 'W4', missRate: 18.7 },
  { week: 'W5', missRate: 11.3 },
  { week: 'W6', missRate: 13.8 },
  { week: 'W7', missRate: 9.4 }
];

const backlogData = [
  { day: 'Mon', '0-2d': 45, '3-5d': 23, '>5d': 8 },
  { day: 'Tue', '0-2d': 52, '3-5d': 31, '>5d': 12 },
  { day: 'Wed', '0-2d': 38, '3-5d': 28, '>5d': 15 },
  { day: 'Thu', '0-2d': 61, '3-5d': 25, '>5d': 9 },
  { day: 'Fri', '0-2d': 48, '3-5d': 35, '>5d': 18 },
  { day: 'Sat', '0-2d': 25, '3-5d': 18, '>5d': 22 },
  { day: 'Sun', '0-2d': 31, '3-5d': 20, '>5d': 11 }
];

const aiSuccessData = [
  { name: 'สำเร็จ (Success)', value: 87.3, color: '#0471d1' },
  { name: 'ล้มเหลว (Failed)', value: 12.7, color: '#fbc41e' }
];

export function TrendCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Submitted vs Approved */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>
            <div>สัญญาเข้าใหม่ vs อนุมัติ (Submitted vs Approved)</div>
            <div className="text-sm text-muted-foreground mt-1">7 สัปดาห์ที่ผ่านมา</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={submittedVsApprovedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="submitted" name="สัญญาเข้าใหม่" fill="#0471d1" />
              <Bar dataKey="approved" name="อนุมัติแล้ว" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cycle Time Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div>กระจายเวลาดำเนินการ (Cycle Time Distribution)</div>
            <div className="text-sm text-muted-foreground mt-1">P50/P75/P90 ในหน่วยชั่วโมง</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={cycleTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="p50" name="P50" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="p75" name="P75" stroke="#0471d1" strokeWidth={2} />
              <Line type="monotone" dataKey="p90" name="P90" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* SLA Miss Rate */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div>อัตราพ้น SLA (SLA Miss Rate)</div>
            <div className="text-sm text-muted-foreground mt-1">เป้าหมาย &lt; 10%</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={slaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, 'Miss Rate']} />
              <Area 
                type="monotone" 
                dataKey="missRate" 
                stroke="#fbc41e" 
                fill="#fbc41e" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Backlog & Aging */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div>งานค้างและอายุงาน (Backlog & Aging)</div>
            <div className="text-sm text-muted-foreground mt-1">จำแนกตามช่วงอายุ</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={backlogData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="0-2d" name="0-2 วัน" stackId="a" fill="#10b981" />
              <Bar dataKey="3-5d" name="3-5 วัน" stackId="a" fill="#fbc41e" />
              <Bar dataKey=">5d" name=">5 วัน" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI/RPA Success Rate */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div>อัตราความสำเร็จ AI/RPA (AI/RPA Success Rate)</div>
            <div className="text-sm text-muted-foreground mt-1">สัปดาห์ปัจจุบัน</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="60%" height={200}>
              <PieChart>
                <Pie
                  data={aiSuccessData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {aiSuccessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 text-sm">
              <div className="font-medium">Top 5 สาเหตุล้มเหลว:</div>
              <div className="space-y-1 text-muted-foreground">
                <div>• OCR ไม่ชัด (35%)</div>
                <div>• เอกสารไม่สมบูรณ์ (28%)</div>
                <div>• รูปแบบไม่มาตรฐาน (18%)</div>
                <div>• การเชื่อมต่อขัดข้อง (12%)</div>
                <div>• อื่นๆ (7%)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}