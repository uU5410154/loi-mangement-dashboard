import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface FilterPanelProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  filters: any;
  onFiltersChange: (filters: any) => void;
}

export function FilterPanel({ isCollapsed, onToggleCollapse, filters, onFiltersChange }: FilterPanelProps) {
  const [buOptions] = useState([
    "Corporate Banking", "Retail Banking", "Investment Banking", "Digital Banking"
  ]);
  
  const [statusOptions] = useState([
    "Submitted", "Approved", "Rejected", "Pending"
  ]);

  const [picOptions] = useState([
    "Somchai Rattana", "Apinya Srisawat", "Kittipong Jaidee", "Siriporn Wongsa"
  ]);

  const activeFiltersCount = Object.values(filters).flat().filter(Boolean).length + 
    (filters.showSLAMissed ? 1 : 0);

  const clearAllFilters = () => {
    onFiltersChange({
      bu: [],
      status: [],
      pic: [],
      contractType: [],
      fileSource: [],
      confidenceThreshold: [75],
      showSLAMissed: false
    });
  };

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-80'}`}>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">ตัวกรอง (Filters)</CardTitle>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="h-8 w-8 p-0"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
          {!isCollapsed && activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs h-6 px-2 self-start"
            >
              <X className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          )}
        </CardHeader>

        {!isCollapsed && (
          <CardContent className="space-y-6">
            {/* BU Filter */}
            <div className="space-y-3">
              <Label className="text-sm">หน่วยธุรกิจ (Business Unit)</Label>
              <div className="space-y-2">
                {buOptions.map((bu) => (
                  <div key={bu} className="flex items-center space-x-2">
                    <Checkbox
                      id={`bu-${bu}`}
                      checked={filters.bu.includes(bu)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          onFiltersChange({
                            ...filters,
                            bu: [...filters.bu, bu]
                          });
                        } else {
                          onFiltersChange({
                            ...filters,
                            bu: filters.bu.filter((item: string) => item !== bu)
                          });
                        }
                      }}
                    />
                    <Label htmlFor={`bu-${bu}`} className="text-sm font-normal">{bu}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-3">
              <Label className="text-sm">สถานะ (Status)</Label>
              <div className="space-y-2">
                {statusOptions.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status}`}
                      checked={filters.status.includes(status)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          onFiltersChange({
                            ...filters,
                            status: [...filters.status, status]
                          });
                        } else {
                          onFiltersChange({
                            ...filters,
                            status: filters.status.filter((item: string) => item !== status)
                          });
                        }
                      }}
                    />
                    <Label htmlFor={`status-${status}`} className="text-sm font-normal">
                      {status === 'Submitted' ? 'สัญญาเข้าใหม่' :
                       status === 'Approved' ? 'อนุมัติแล้ว' :
                       status === 'Rejected' ? 'ไม่ผ่าน' : 'รอดำเนินการ'} ({status})
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* PIC Filter */}
            <div className="space-y-3">
              <Label className="text-sm">ผู้รับผิดชอบ (PIC)</Label>
              <div className="space-y-2">
                {picOptions.map((pic) => (
                  <div key={pic} className="flex items-center space-x-2">
                    <Checkbox
                      id={`pic-${pic}`}
                      checked={filters.pic.includes(pic)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          onFiltersChange({
                            ...filters,
                            pic: [...filters.pic, pic]
                          });
                        } else {
                          onFiltersChange({
                            ...filters,
                            pic: filters.pic.filter((item: string) => item !== pic)
                          });
                        }
                      }}
                    />
                    <Label htmlFor={`pic-${pic}`} className="text-sm font-normal">{pic}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract Type */}
            <div className="space-y-3">
              <Label className="text-sm">ประเภทสัญญา (Contract Type)</Label>
              <div className="space-y-2">
                {['Permanent_fixed', 'Service_express'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`contract-${type}`}
                      checked={filters.contractType.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          onFiltersChange({
                            ...filters,
                            contractType: [...filters.contractType, type]
                          });
                        } else {
                          onFiltersChange({
                            ...filters,
                            contractType: filters.contractType.filter((item: string) => item !== type)
                          });
                        }
                      }}
                    />
                    <Label htmlFor={`contract-${type}`} className="text-sm font-normal">{type}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Confidence Threshold */}
            <div className="space-y-3">
              <Label className="text-sm">ระดับความเชื่อมั่น OCR (Confidence Threshold)</Label>
              <div className="px-2">
                <Slider
                  value={filters.confidenceThreshold}
                  onValueChange={(value) => onFiltersChange({
                    ...filters,
                    confidenceThreshold: value
                  })}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span>{filters.confidenceThreshold[0]}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* SLA Missed Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="sla-missed" className="text-sm">
                แสดงเฉพาะที่พ้น SLA<br />
                <span className="text-xs text-muted-foreground">(Show only SLA missed)</span>
              </Label>
              <Switch
                id="sla-missed"
                checked={filters.showSLAMissed}
                onCheckedChange={(checked) => onFiltersChange({
                  ...filters,
                  showSLAMissed: checked
                })}
              />
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}