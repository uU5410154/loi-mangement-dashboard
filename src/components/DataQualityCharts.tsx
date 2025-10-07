import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell } from "recharts";
import { Badge } from "./ui/badge";

const retryData = [
  { stage: 'OCR', retries: 234, rate: 18.8 },
  { stage: 'Scrape', retries: 156, rate: 12.5 },
  { stage: 'Compare', retries: 89, rate: 7.1 },
  { stage: 'Validate', retries: 67, rate: 5.4 }
];

const ocrConfidenceData = [
  { range: '0-20%', count: 23, fill: '#ef4444' },
  { range: '21-40%', count: 45, fill: '#ef4444' },
  { range: '41-60%', count: 78, fill: '#ef4444' },
  { range: '61-80%', count: 234, fill: '#0471d1' },
  { range: '81-100%', count: 867, fill: '#0471d1' }
];

const editedFieldsData = [
  { field: 'ชื่อผู้เช่า (Tenant Name)', edits: 234, percentage: 28.5 },
  { field: 'เลขที่สัญญา (Contract No.)', edits: 189, percentage: 23.1 },
  { field: 'จำนวนเงิน (Amount)', edits: 156, percentage: 19.0 },
  { field: 'สาขา VAT (VAT Branch)', edits: 123, percentage: 15.0 },
  { field: 'งวดชำระ (Payment Period)', edits: 118, percentage: 14.4 }
];

const contractAccuracy = [
  { type: 'Permanent_fixed', accuracy: 94.2, total: 678, correct: 639 },
  { type: 'Service_express', accuracy: 91.8, total: 569, correct: 522 }
];

export function DataQualityCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Retries by Stage */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div>จำนวนครั้งที่ลองใหม่ตามขั้นตอน (Retries by Stage)</div>
            <div className="text-sm text-muted-foreground mt-1">สัปดาห์ปัจจุบัน</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={retryData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="stage" type="category" width={80} />
              <Tooltip formatter={(value, name) => [
                name === 'retries' ? `${value} ครั้ง` : `${value}%`,
                name === 'retries' ? 'จำนวนครั้ง' : 'อัตรา'
              ]} />
              <Bar dataKey="retries" name="retries" fill="#0471d1" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* OCR Confidence Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div>กระจายความเชื่อมั่น OCR (OCR Confidence)</div>
            <div className="text-sm text-muted-foreground mt-1">
              <Badge variant="destructive" className="text-xs">
                15.2% ต่ำกว่า 75%
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ocrConfidenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} เอกสาร`, 'จำนวน']} />
              <Bar dataKey="count" name="count">
                {ocrConfidenceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Manual Edits */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>
            <div>ฟิลด์ที่ถูกแก้ไขบ่อยที่สุด (Top 5 Edited Fields)</div>
            <div className="text-sm text-muted-foreground mt-1">
              เฉลี่ย 2.3 การแก้ไขต่อเอกสาร
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {editedFieldsData.map((field, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">{field.field}</div>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div 
                      className="bg-[#0471d1] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${field.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-right text-sm">
                  <div className="font-medium">{field.edits}</div>
                  <div className="text-muted-foreground">{field.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contract Type Accuracy */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>
            <div>ความแม่นยำการจำแนกประเภทสัญญา (Contract Type Accuracy)</div>
            <div className="text-sm text-muted-foreground mt-1">ผลการจำแนกโดย AI</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contractAccuracy.map((contract, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{contract.type}</div>
                  <div className="text-2xl font-bold text-[#0471d1]">
                    {contract.accuracy}%
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {contract.correct} / {contract.total} ถูกต้อง
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-[#0471d1] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${contract.accuracy}%` }}
                  />
                </div>
                {contract.accuracy < 95 && (
                  <div className="text-xs text-[#fbc41e] bg-[#fbc41e]/10 p-2 rounded">
                    ⚠️ ต่ำกว่าเป้าหมาย 95%
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}