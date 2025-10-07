import { MetricDefinition } from '../types/metric';
import { MetricType } from '../types/dashboard';

export const METRICS_CONFIG: Record<MetricType, MetricDefinition> = {
  total_contracts: {
    type: 'total_contracts',
    name: 'Total Contracts',
    nameThai: 'จำนวนสัญญาทั้งหมดจาก Simplicity',
    description: 'Total number of contracts from Simplicity system',
    descriptionThai: 'จำนวนสัญญาทั้งหมดที่นำเข้าจากระบบ Simplicity',
    unit: 'number',
    category: 'contract',
    aggregations: ['sum', 'count', 'avg'],
    source: 'Simplicity',
    icon: 'Database',
    color: '#0471d1'
  },
  checked_contracts: {
    type: 'checked_contracts',
    name: 'Checked by LOI Autocheck',
    nameThai: 'ตรวจโดยระบบ LOI Autocheck',
    description: 'Number of contracts checked by LOI Autocheck system',
    descriptionThai: 'จำนวนสัญญาที่ได้รับการตรวจสอบโดยระบบ LOI Autocheck',
    unit: 'number',
    category: 'contract',
    aggregations: ['sum', 'count', 'avg'],
    source: 'LOI Autocheck',
    icon: 'Eye',
    color: '#0471d1'
  },
  approved: {
    type: 'approved',
    name: 'Approved',
    nameThai: 'อนุมัติ',
    description: 'Number of approved contracts',
    descriptionThai: 'จำนวนสัญญาที่อนุมัติแล้ว',
    unit: 'number',
    category: 'contract',
    aggregations: ['sum', 'count'],
    source: 'LOI Autocheck',
    icon: 'CheckCircle',
    color: '#10b981'
  },
  not_approved: {
    type: 'not_approved',
    name: 'Not Approved',
    nameThai: 'ไม่อนุมัติ',
    description: 'Number of contracts not approved',
    descriptionThai: 'จำนวนสัญญาที่ไม่อนุมัติ',
    unit: 'number',
    category: 'contract',
    aggregations: ['sum', 'count'],
    source: 'LOI Autocheck',
    icon: 'XCircle',
    color: '#ef4444'
  },
  under_review: {
    type: 'under_review',
    name: 'Under Review',
    nameThai: 'อยู่ระหว่างการตรวจสอบ',
    description: 'Number of contracts under review',
    descriptionThai: 'จำนวนสัญญาที่อยู่ระหว่างการตรวจสอบ',
    unit: 'number',
    category: 'contract',
    aggregations: ['sum', 'count'],
    source: 'LOI Autocheck',
    icon: 'AlertTriangle',
    color: '#f59e0b'
  },
  ocr_confidence: {
    type: 'ocr_confidence',
    name: 'Average OCR Confidence',
    nameThai: 'ค่าความมั่นใจ OCR เฉลี่ย',
    description: 'Average OCR confidence level',
    descriptionThai: 'ระดับความมั่นใจของ OCR โดยเฉลี่ย',
    unit: 'percentage',
    category: 'quality',
    aggregations: ['avg', 'min', 'max'],
    source: 'LOI Autocheck',
    icon: 'Activity',
    color: '#10b981'
  },
  accuracy_rate: {
    type: 'accuracy_rate',
    name: 'Average Accuracy Rate',
    nameThai: 'อัตราความแม่นยำเฉลี่ย',
    description: 'Average accuracy rate of contract processing',
    descriptionThai: 'อัตราความแม่นยำในการประมวลผลสัญญาโดยเฉลี่ย',
    unit: 'percentage',
    category: 'quality',
    aggregations: ['avg', 'min', 'max'],
    source: 'LOI Autocheck',
    icon: 'Target',
    color: '#10b981'
  },
  processing_time: {
    type: 'processing_time',
    name: 'Average Processing Time',
    nameThai: 'เวลาเฉลี่ยต่อสัญญา',
    description: 'Average time to process one contract',
    descriptionThai: 'เวลาเฉลี่ยในการประมวลผลสัญญาหนึ่งฉบับ',
    unit: 'time',
    category: 'performance',
    aggregations: ['avg', 'min', 'max'],
    source: 'LOI Autocheck',
    icon: 'Timer',
    color: '#0471d1'
  },
  manual_validation: {
    type: 'manual_validation',
    name: 'Manual Validation Rate',
    nameThai: 'การตรวจสอบด้วยมือเฉลี่ย',
    description: 'Percentage requiring manual validation',
    descriptionThai: 'เปอร์เซ็นต์ที่ต้องการการตรวจสอบด้วยมือ',
    unit: 'percentage',
    category: 'performance',
    aggregations: ['avg'],
    source: 'LOI Autocheck',
    icon: 'Users',
    color: '#f59e0b'
  },
  cycle_time: {
    type: 'cycle_time',
    name: 'Cycle Time',
    nameThai: 'Cycle Time',
    description: 'Time from creation to decision',
    descriptionThai: 'เวลาจากการสร้างถึงการตัดสินใจ',
    unit: 'time',
    category: 'performance',
    aggregations: ['avg', 'min', 'max'],
    source: 'LOI Autocheck',
    icon: 'Clock',
    color: '#0471d1'
  },
  backlog: {
    type: 'backlog',
    name: 'Backlog',
    nameThai: 'Backlog ค้างตรวจ',
    description: 'Pending review backlog',
    descriptionThai: 'จำนวนสัญญาที่รอการตรวจสอบ',
    unit: 'number',
    category: 'system',
    aggregations: ['sum', 'count'],
    source: 'LOI Autocheck',
    icon: 'BarChart3',
    color: '#f59e0b'
  }
};

export const METRIC_CATEGORIES = {
  contract: {
    id: 'contract',
    name: 'Contract Quantity',
    nameThai: 'จำนวนสัญญา',
    metrics: ['total_contracts', 'checked_contracts', 'approved', 'not_approved', 'under_review']
  },
  performance: {
    id: 'performance',
    name: 'Performance',
    nameThai: 'ประสิทธิภาพ',
    metrics: ['processing_time', 'manual_validation', 'cycle_time']
  },
  quality: {
    id: 'quality',
    name: 'Quality',
    nameThai: 'คุณภาพ',
    metrics: ['ocr_confidence', 'accuracy_rate']
  },
  system: {
    id: 'system',
    name: 'System',
    nameThai: 'ระบบ',
    metrics: ['backlog']
  }
} as const;
