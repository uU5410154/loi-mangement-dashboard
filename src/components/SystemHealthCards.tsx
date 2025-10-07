import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, AreaChart, Area } from "recharts";

const uptimeData = [
  { time: '00:00', uptime: 100 },
  { time: '04:00', uptime: 100 },
  { time: '08:00', uptime: 99.8 },
  { time: '12:00', uptime: 100 },
  { time: '16:00', uptime: 100 },
  { time: '20:00', uptime: 99.9 },
  { time: '24:00', uptime: 100 }
];

const queueData = [
  { time: '00:00', queue: 12, runtime: 45 },
  { time: '04:00', queue: 8, runtime: 38 },
  { time: '08:00', queue: 34, runtime: 67 },
  { time: '12:00', queue: 28, runtime: 52 },
  { time: '16:00', queue: 41, runtime: 78 },
  { time: '20:00', queue: 19, runtime: 43 },
  { time: '24:00', queue: 15, runtime: 41 }
];

const incidents = [
  {
    severity: 'high',
    title: 'SharePoint Connection Timeout',
    start: '2024-01-15 14:30',
    end: '2024-01-15 15:45',
    duration: '1h 15m',
    summary: 'การเชื่อมต่อ SharePoint ขัดข้อง ส่งผลต่อการดึงเอกสาร 45 ฉบับ',
    status: 'resolved'
  },
  {
    severity: 'medium',
    title: 'OCR Service Degraded Performance',
    start: '2024-01-14 09:15',
    end: '2024-01-14 10:30',
    duration: '1h 15m',
    summary: 'ประสิทธิภาพ OCR ลดลง เวลาประมวลผลเพิ่มขึ้น 40%',
    status: 'resolved'
  },
  {
    severity: 'low',
    title: 'Scheduled Maintenance',
    start: '2024-01-13 02:00',
    end: '2024-01-13 04:00',
    duration: '2h 0m',
    summary: 'การบำรุงรักษาตามแผน อัปเดตระบบและฐานข้อมูล',
    status: 'completed'
  }
];

const webScrapeStatus = [
  { service: 'Simplicity', successRate: 98.5, status: 'healthy' },
  { service: 'SharePoint', successRate: 94.2, status: 'warning' }
];

export function SystemHealthCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* System Uptime */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <div>
                <div>ความพร้อมใช้งาน (Uptime)</div>
                <div className="text-sm text-muted-foreground mt-1">เป้าหมาย ≥99%</div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                99.8%
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={uptimeData}>
              <Area 
                type="monotone" 
                dataKey="uptime" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="text-xs text-muted-foreground mt-2">
            24 ชั่วโมงที่ผ่านมา
          </div>
        </CardContent>
      </Card>

      {/* Queue & Runtime */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div>คิว & เวลาประมวลผล (Queue & Runtime)</div>
            <div className="text-sm text-muted-foreground mt-1">ปัจจุบัน: 15 คิว, 41 วินาที</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={queueData}>
              <Line type="monotone" dataKey="queue" stroke="#0471d1" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="runtime" stroke="#fbc41e" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>🔵 Queue Size</span>
            <span>🟡 Runtime (sec)</span>
          </div>
        </CardContent>
      </Card>

      {/* Web Scrape Success */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div>การดึงข้อมูลเว็บ (Web Scrape Success)</div>
            <div className="text-sm text-muted-foreground mt-1">อัตราความสำเร็จ</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {webScrapeStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    service.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <span className="text-sm">{service.service}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{service.successRate}%</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Incidents */}
      <Card className="lg:col-span-2 xl:col-span-3">
        <CardHeader>
          <CardTitle>
            <div>เหตุการณ์ล่าสุด (Recent Incidents)</div>
            <div className="text-sm text-muted-foreground mt-1">7 วันที่ผ่านมา</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incidents.map((incident, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {incident.severity === 'high' ? (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  ) : incident.severity === 'medium' ? (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{incident.title}</h4>
                    <Badge 
                      variant={incident.severity === 'high' ? 'destructive' : 
                               incident.severity === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {incident.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {incident.status === 'resolved' ? 'แก้ไขแล้ว' : 
                       incident.status === 'completed' ? 'เสร็จสิ้น' : 'กำลังดำเนิน'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{incident.summary}</p>
                  <div className="text-xs text-muted-foreground">
                    {incident.start} → {incident.end} ({incident.duration})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}