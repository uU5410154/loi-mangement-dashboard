import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, ChevronLeft, ChevronRight, Eye, Download, UserCheck, Users, PieChart, BarChart3 } from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const workItemsData = [
  {
    id: "DOC-2024-001247",
    bu: "Corporate Banking",
    status: "Approved",
    taskCreated: "2024-01-15 09:30",
    processedTime: "2024-01-15 13:45",
    cycleTime: "4h 15m",
    fpy: true,
    edits: 0,
    ocrConf: 92.5,
    contractType: "Permanent_fixed",
    pic: "Somchai Rattana",
    responsiblePerson: "Somchai Rattana",
    actualOperator: "Somchai Rattana",
    source: "SharePoint"
  },
  {
    id: "DOC-2024-001246",
    bu: "Retail Banking",
    status: "Rejected",
    taskCreated: "2024-01-15 08:15",
    processedTime: "2024-01-15 14:30",
    cycleTime: "6h 15m",
    fpy: false,
    edits: 3,
    ocrConf: 67.8,
    contractType: "Service_express",
    pic: "Apinya Srisawat",
    responsiblePerson: "Apinya Srisawat",
    actualOperator: "Niran Thepsiri",
    source: "Simplicity"
  },
  {
    id: "DOC-2024-001245",
    bu: "Investment Banking",
    status: "Pending",
    taskCreated: "2024-01-15 10:45",
    processedTime: null,
    cycleTime: "2h 30m",
    fpy: null,
    edits: 1,
    ocrConf: 88.2,
    contractType: "Permanent_fixed",
    pic: "Kittipong Jaidee",
    responsiblePerson: "Kittipong Jaidee",
    actualOperator: null,
    source: "SharePoint"
  },
  {
    id: "DOC-2024-001244",
    bu: "Digital Banking",
    status: "Approved",
    taskCreated: "2024-01-14 16:20",
    processedTime: "2024-01-15 09:15",
    cycleTime: "16h 55m",
    fpy: true,
    edits: 0,
    ocrConf: 95.1,
    contractType: "Service_express",
    pic: "Siriporn Wongsa",
    responsiblePerson: "Siriporn Wongsa",
    actualOperator: "Manit Sukanya",
    source: "Simplicity"
  },
  {
    id: "DOC-2024-001243",
    bu: "Corporate Banking",
    status: "Approved",
    taskCreated: "2024-01-14 14:10",
    processedTime: "2024-01-14 17:25",
    cycleTime: "3h 15m",
    fpy: false,
    edits: 2,
    ocrConf: 84.7,
    contractType: "Permanent_fixed",
    pic: "Somchai Rattana",
    responsiblePerson: "Somchai Rattana",
    actualOperator: "Somchai Rattana",
    source: "SharePoint"
  },
  {
    id: "DOC-2024-001242",
    bu: "Retail Banking",
    status: "Approved",
    taskCreated: "2024-01-14 11:20",
    processedTime: "2024-01-14 15:45",
    cycleTime: "4h 25m",
    fpy: true,
    edits: 0,
    ocrConf: 91.3,
    contractType: "Service_express",
    pic: "Wannipa Sitthara",
    responsiblePerson: "Wannipa Sitthara",
    actualOperator: "Suphot Kaewsa",
    source: "Simplicity"
  },
  {
    id: "DOC-2024-001241",
    bu: "Investment Banking",
    status: "Rejected",
    taskCreated: "2024-01-14 13:15",
    processedTime: "2024-01-14 16:30",
    cycleTime: "3h 15m",
    fpy: false,
    edits: 4,
    ocrConf: 72.1,
    contractType: "Permanent_fixed",
    pic: "Chatree Mongkol",
    responsiblePerson: "Chatree Mongkol",
    actualOperator: "Chatree Mongkol",
    source: "SharePoint"
  }
];

const rejectionReasons = [
  { reason: "เอกสารไม่ชัด/ไม่สมบูรณ์ (Incomplete Document)", count: 45, percentage: 28.1 },
  { reason: "ข้อมูลไม่ตรงกับระบบ (Data Mismatch)", count: 38, percentage: 23.8 },
  { reason: "ลายเซ็นไม่ชัด (Unclear Signature)", count: 29, percentage: 18.1 },
  { reason: "วันที่หมดอายุ (Expired Date)", count: 22, percentage: 13.8 },
  { reason: "ข้อมูล VAT ผิด (Incorrect VAT)", count: 19, percentage: 11.9 },
  { reason: "จำนวนเงินไม่ถูกต้อง (Incorrect Amount)", count: 7, percentage: 4.3 }
];

// Contract breakdown data
const contractBreakdownData = {
  byBU: [
    { name: "Corporate Banking", value: 156, percentage: 32.1, color: "#0471d1" },
    { name: "Retail Banking", value: 134, percentage: 27.6, color: "#fbc41e" },
    { name: "Investment Banking", value: 98, percentage: 20.2, color: "#16a34a" },
    { name: "Digital Banking", value: 97, percentage: 20.0, color: "#dc2626" }
  ],
  byStatus: [
    { name: "อนุมัติแล้ว", englishName: "Approved", value: 318, percentage: 65.6, color: "#16a34a" },
    { name: "ไม่ผ่าน", englishName: "Rejected", value: 87, percentage: 17.9, color: "#dc2626" },
    { name: "รอดำเนินการ", englishName: "Pending", value: 56, percentage: 11.5, color: "#f59e0b" },
    { name: "สัญญาเข้าใหม่", englishName: "Submitted", value: 24, percentage: 4.9, color: "#6b7280" }
  ],
  byTenantType: [
    { name: "ธุรกิจขนาดใหญ่", englishName: "Large Enterprise", value: 198, percentage: 40.8, color: "#0471d1" },
    { name: "ธุรกิจขนาดกลาง", englishName: "Medium Business", value: 147, percentage: 30.3, color: "#fbc41e" },
    { name: "ธุรกิจขนาดเล็ก", englishName: "Small Business", value: 89, percentage: 18.4, color: "#16a34a" },
    { name: "รายบุคคล", englishName: "Individual", value: 51, percentage: 10.5, color: "#8b5cf6" }
  ],
  byContractType: [
    { name: "Permanent Fixed", value: 267, percentage: 55.1, color: "#0471d1" },
    { name: "Service Express", value: 184, percentage: 38.0, color: "#fbc41e" },
    { name: "Temporary Contract", value: 34, percentage: 7.0, color: "#16a34a" }
  ],
  monthlyTrend: [
    { month: "มกราคม", approved: 45, rejected: 12, pending: 8, submitted: 5 },
    { month: "กุมภาพันธ์", approved: 52, rejected: 15, pending: 9, submitted: 6 },
    { month: "มีนาคม", approved: 61, rejected: 18, pending: 11, submitted: 7 },
    { month: "เมษายน", approved: 58, rejected: 16, pending: 10, submitted: 6 },
    { month: "พฤษภาคม", approved: 67, rejected: 19, pending: 12, submitted: 8 },
    { month: "มิถุนายน", approved: 71, rejected: 21, pending: 14, submitted: 9 }
  ]
};

const COLORS = ["#0471d1", "#fbc41e", "#16a34a", "#dc2626", "#8b5cf6", "#f59e0b"];

function getStatusBadge(status: string) {
  const variants = {
    'Approved': 'default',
    'Rejected': 'destructive',
    'Pending': 'secondary',
    'Submitted': 'outline'
  } as const;

  const labels = {
    'Approved': 'อนุมัติแล้ว',
    'Rejected': 'ไม่ผ่าน',
    'Pending': 'รอดำเนินการ',
    'Submitted': 'สัญญาเข้าใหม่'
  };

  return (
    <Badge variant={variants[status as keyof typeof variants]}>
      {labels[status as keyof typeof labels]}
    </Badge>
  );
}

function getResponsibilityIndicator(responsiblePerson: string, actualOperator: string | null, status: string) {
  if (status === 'Pending' || !actualOperator) {
    return (
      <div className="flex items-center gap-1 text-muted-foreground">
        <UserCheck className="h-3 w-3" />
        <span className="text-xs">รอดำเนินการ</span>
      </div>
    );
  }

  const isSamePerson = responsiblePerson === actualOperator;
  
  if (isSamePerson) {
    return (
      <div className="flex items-center gap-1 text-green-600">
        <UserCheck className="h-3 w-3" />
        <span className="text-xs">ตรงตามที่มอบหมาย</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-1 text-orange-600">
        <Users className="h-3 w-3" />
        <span className="text-xs">มีผู้อื่นช่วย</span>
      </div>
    );
  }
}

export function DataTable() {
  const [activeTab, setActiveTab] = useState("workItems");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  const itemsPerPage = 10;
  const filteredData = workItemsData.filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.bu.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.pic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.responsiblePerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.actualOperator && item.actualOperator.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="workItems">รายการงาน (Work Items)</TabsTrigger>
          <TabsTrigger value="breakdown">การแบ่งกลุ่มสัญญา (Contract Breakdown)</TabsTrigger>
          <TabsTrigger value="rejections">สาเหตุปฏิเสธ (Rejection Reasons)</TabsTrigger>
        </TabsList>

        <TabsContent value="workItems" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>รายการงานทั้งหมด (All Work Items)</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="ค้นหา ID, BU, ผู้รับผิดชอบ..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto min-w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[140px]">Doc ID</TableHead>
                      <TableHead className="min-w-[120px]">BU</TableHead>
                      <TableHead className="min-w-[100px]">สถานะ</TableHead>
                      <TableHead className="min-w-[130px]">วันที่สร้าง</TableHead>
                      <TableHead className="min-w-[100px]">เวลา</TableHead>
                      <TableHead className="min-w-[60px]">FPY</TableHead>
                      <TableHead className="min-w-[60px]">แก้ไข</TableHead>
                      <TableHead className="min-w-[70px]">OCR %</TableHead>
                      <TableHead className="min-w-[120px]">ประเภท</TableHead>
                      <TableHead className="min-w-[150px]">ผู้รับผิดชอบ</TableHead>
                      <TableHead className="min-w-[130px]">ผู้ดำเนินการจริง</TableHead>
                      <TableHead className="min-w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono text-sm">{item.id}</TableCell>
                        <TableCell>{item.bu}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell className="text-sm">{item.taskCreated}</TableCell>
                        <TableCell className="text-sm">{item.cycleTime}</TableCell>
                        <TableCell>
                          {item.fpy === true ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              ✓ Yes
                            </Badge>
                          ) : item.fpy === false ? (
                            <Badge variant="outline">✗ No</Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>{item.edits}</TableCell>
                        <TableCell>
                          <span className={item.ocrConf < 75 ? 'text-red-600' : item.ocrConf < 85 ? 'text-yellow-600' : 'text-green-600'}>
                            {item.ocrConf}%
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">{item.contractType}</TableCell>
                        <TableCell className="text-sm">
                          <div>
                            <div className="font-medium">{item.responsiblePerson}</div>
                            {getResponsibilityIndicator(item.responsiblePerson, item.actualOperator, item.status)}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {item.actualOperator ? (
                            <div className="font-medium">{item.actualOperator}</div>
                          ) : (
                            <span className="text-muted-foreground italic">รอดำเนินการ</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => setSelectedItem(item)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>รายละเอียดเอกสาร: {item.id}</DialogTitle>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <h4 className="font-medium">ข้อมูลพื้นฐาน</h4>
                                  <div className="space-y-2 text-sm">
                                    <div><strong>BU:</strong> {item.bu}</div>
                                    <div><strong>สถานะ:</strong> {getStatusBadge(item.status)}</div>
                                    <div><strong>ประเภทสัญญา:</strong> {item.contractType}</div>
                                    <div><strong>แหล่งไฟล์:</strong> {item.source}</div>
                                  </div>
                                  
                                  <h4 className="font-medium mt-6">การติดตามความรับผิดชอบ</h4>
                                  <div className="space-y-2 text-sm">
                                    <div><strong>ผู้รับผิดชอบที่มอบหมาย:</strong> {item.responsiblePerson}</div>
                                    <div><strong>ผู้ดำเนินการจริง:</strong> {item.actualOperator || 'รอดำเนินการ'}</div>
                                    <div className="flex items-center gap-2">
                                      <strong>สถานะการปฏิบัติงาน:</strong>
                                      {getResponsibilityIndicator(item.responsiblePerson, item.actualOperator, item.status)}
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <h4 className="font-medium">ข้อมูลประมวลผล</h4>
                                  <div className="space-y-2 text-sm">
                                    <div><strong>เวลาสร้าง:</strong> {item.taskCreated}</div>
                                    <div><strong>เวลาประมวลผล:</strong> {item.processedTime || 'กำลังดำเนินการ'}</div>
                                    <div><strong>ระยะเวลา:</strong> {item.cycleTime}</div>
                                    <div><strong>จำนวนแก้ไข:</strong> {item.edits} ครั้ง</div>
                                    <div><strong>ความเชื่อมั่น OCR:</strong> {item.ocrConf}%</div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  แสดง {startIndex + 1}-{Math.min(endIndex, filteredData.length)} จาก {filteredData.length} รายการ
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">{currentPage} / {totalPages}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0471d1]">485</div>
                  <div className="text-sm text-muted-foreground">สัญญาทั้งหมด</div>
                  <div className="text-xs text-muted-foreground">Total Contracts</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">318</div>
                  <div className="text-sm text-muted-foreground">อนุมัติแล้ว</div>
                  <div className="text-xs text-muted-foreground">Approved (65.6%)</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#fbc41e]">198</div>
                  <div className="text-sm text-muted-foreground">ธุรกิจขนาดใหญ่</div>
                  <div className="text-xs text-muted-foreground">Large Enterprise (40.8%)</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0471d1]">267</div>
                  <div className="text-sm text-muted-foreground">Permanent Fixed</div>
                  <div className="text-xs text-muted-foreground">Contract Type (55.1%)</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tenant Type Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  การแจกแจงตามประเภทผู้เช่า (Tenant Type Distribution)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={contractBreakdownData.byTenantType}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {contractBreakdownData.byTenantType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'จำนวนสัญญา']} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {contractBreakdownData.byTenantType.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                        <span className="text-xs text-muted-foreground">({item.englishName})</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.value}</div>
                        <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  การแจกแจงตาม BU (Business Unit Distribution)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={contractBreakdownData.byBU}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {contractBreakdownData.byBU.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'จำนวนสัญญา']} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {contractBreakdownData.byBU.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.value}</div>
                        <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status and Contract Type Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>การแจกแจงตามสถานะ (Status Distribution)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contractBreakdownData.byStatus.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-xs text-muted-foreground">({item.englishName})</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{item.value}</div>
                          <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${item.percentage}%`,
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>การแจกแจงตามประเภทสัญญา (Contract Type Distribution)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contractBreakdownData.byContractType.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{item.value}</div>
                          <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${item.percentage}%`,
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle>แนวโน้มรายเดือน (Monthly Trend)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contractBreakdownData.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="approved" stackId="a" fill="#16a34a" name="อนุมัติแล้ว" />
                    <Bar dataKey="rejected" stackId="a" fill="#dc2626" name="ไม่ผ่าน" />
                    <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="รอดำเนินการ" />
                    <Bar dataKey="submitted" stackId="a" fill="#6b7280" name="สัญญาเข้าใหม่" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejections">
          <Card>
            <CardHeader>
              <CardTitle>สาเหตุการปฏิเสธ (Top Rejection Reasons)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rejectionReasons.map((reason, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm mb-1">{reason.reason}</div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-[#0471d1] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${reason.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="font-bold text-lg">{reason.count}</div>
                      <div className="text-sm text-muted-foreground">{reason.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}