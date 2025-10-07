import { Database, Eye, Activity, Target, PieChart, BarChart3, Table, AlertCircle } from 'lucide-react';
import { WidgetDefinition } from '../types/widget';
import { WidgetType } from '../types/dashboard';

// Import widget components
import { MetricCardWidget } from '../components/widgets/MetricCardWidget';

// Placeholders for widgets we haven't created yet
const ChartWidget = () => null;
const TableWidget = () => null;
const ContractSummaryWidget = () => null;
const StatusWidget = () => null;

export const WIDGET_REGISTRY: Record<WidgetType, WidgetDefinition> = {
  'metric-card': {
    type: 'metric-card',
    name: 'Metric Card',
    nameThai: 'การ์ดตัวชี้วัด',
    description: 'Display a single metric with trend indicator',
    descriptionThai: 'แสดงตัวชี้วัดเดียวพร้อมแนวโน้ม',
    icon: <Activity className="h-4 w-4" />,
    category: 'overview',
    defaultConfig: {
      metricType: 'total_contracts',
      timeRange: '7d',
      displayOptions: {
        showTrend: true,
        showComparison: true
      }
    },
    defaultSize: { w: 3, h: 2 },
    minSize: { w: 2, h: 2 },
    maxSize: { w: 4, h: 3 },
    component: MetricCardWidget,
    configurable: true,
    requiresMetric: true
  },

  'chart': {
    type: 'chart',
    name: 'Chart',
    nameThai: 'กราฟ',
    description: 'Visualize data with various chart types',
    descriptionThai: 'แสดงข้อมูลด้วยกราฟหลายรูปแบบ',
    icon: <BarChart3 className="h-4 w-4" />,
    category: 'analytics',
    defaultConfig: {
      chartType: 'line',
      metricType: 'total_contracts',
      timeRange: '30d',
      displayOptions: {
        showTrend: true
      }
    },
    defaultSize: { w: 6, h: 4 },
    minSize: { w: 4, h: 3 },
    maxSize: { w: 12, h: 6 },
    component: ChartWidget,
    configurable: true,
    requiresMetric: true
  },

  'table': {
    type: 'table',
    name: 'Data Table',
    nameThai: 'ตารางข้อมูล',
    description: 'Display detailed data in table format',
    descriptionThai: 'แสดงข้อมูลรายละเอียดในรูปแบบตาราง',
    icon: <Table className="h-4 w-4" />,
    category: 'data',
    defaultConfig: {
      timeRange: '7d',
      displayOptions: {
        title: 'Contract Details'
      }
    },
    defaultSize: { w: 12, h: 6 },
    minSize: { w: 6, h: 4 },
    maxSize: { w: 12, h: 8 },
    component: TableWidget,
    configurable: true,
    requiresMetric: false
  },

  'status': {
    type: 'status',
    name: 'Status Indicator',
    nameThai: 'ตัวบ่งชี้สถานะ',
    description: 'Show system or process status',
    descriptionThai: 'แสดงสถานะระบบหรือกระบวนการ',
    icon: <AlertCircle className="h-4 w-4" />,
    category: 'system',
    defaultConfig: {
      displayOptions: {
        showTrend: false
      }
    },
    defaultSize: { w: 3, h: 2 },
    minSize: { w: 2, h: 2 },
    maxSize: { w: 4, h: 3 },
    component: StatusWidget,
    configurable: false,
    requiresMetric: false
  },

  'contract-summary': {
    type: 'contract-summary',
    name: 'Contract Summary',
    nameThai: 'สรุปสถานะสัญญา',
    description: 'Comprehensive contract overview with charts',
    descriptionThai: 'ภาพรวมสัญญาแบบครบถ้วนพร้อมกราฟ',
    icon: <PieChart className="h-4 w-4" />,
    category: 'overview',
    defaultConfig: {
      timeRange: '7d',
      displayOptions: {
        showTrend: true
      }
    },
    defaultSize: { w: 12, h: 6 },
    minSize: { w: 8, h: 5 },
    maxSize: { w: 12, h: 8 },
    component: ContractSummaryWidget,
    configurable: true,
    requiresMetric: false
  },

  'trend-chart': {
    type: 'trend-chart',
    name: 'Trend Analysis',
    nameThai: 'การวิเคราะห์แนวโน้ม',
    description: 'Analyze trends over time',
    descriptionThai: 'วิเคราะห์แนวโน้มตามช่วงเวลา',
    icon: <BarChart3 className="h-4 w-4" />,
    category: 'analytics',
    defaultConfig: {
      chartType: 'area',
      timeRange: '30d',
      displayOptions: {
        showTrend: true,
        showComparison: true
      }
    },
    defaultSize: { w: 6, h: 4 },
    minSize: { w: 4, h: 3 },
    maxSize: { w: 12, h: 6 },
    component: ChartWidget,
    configurable: true,
    requiresMetric: true
  },

  'data-quality': {
    type: 'data-quality',
    name: 'Data Quality',
    nameThai: 'คุณภาพข้อมูล',
    description: 'Monitor data quality metrics',
    descriptionThai: 'ติดตามตัวชี้วัดคุณภาพข้อมูล',
    icon: <Activity className="h-4 w-4" />,
    category: 'analytics',
    defaultConfig: {
      metricType: 'ocr_confidence',
      timeRange: '7d',
      displayOptions: {
        showTrend: true
      }
    },
    defaultSize: { w: 6, h: 4 },
    minSize: { w: 4, h: 3 },
    maxSize: { w: 8, h: 6 },
    component: ChartWidget,
    configurable: true,
    requiresMetric: true
  },

  'system-health': {
    type: 'system-health',
    name: 'System Health',
    nameThai: 'สุขภาพระบบ',
    description: 'Monitor system health and performance',
    descriptionThai: 'ติดตามสุขภาพและประสิทธิภาพระบบ',
    icon: <AlertCircle className="h-4 w-4" />,
    category: 'system',
    defaultConfig: {
      displayOptions: {
        showTrend: false
      }
    },
    defaultSize: { w: 6, h: 3 },
    minSize: { w: 4, h: 2 },
    maxSize: { w: 8, h: 4 },
    component: StatusWidget,
    configurable: false,
    requiresMetric: false
  }
};

export const WIDGET_CATEGORIES = [
  {
    id: 'overview',
    name: 'Overview',
    nameThai: 'ภาพรวม',
    icon: <Eye className="h-4 w-4" />
  },
  {
    id: 'analytics',
    name: 'Analytics',
    nameThai: 'การวิเคราะห์',
    icon: <BarChart3 className="h-4 w-4" />
  },
  {
    id: 'performance',
    name: 'Performance',
    nameThai: 'ประสิทธิภาพ',
    icon: <Activity className="h-4 w-4" />
  },
  {
    id: 'system',
    name: 'System',
    nameThai: 'ระบบ',
    icon: <AlertCircle className="h-4 w-4" />
  },
  {
    id: 'data',
    name: 'Data',
    nameThai: 'ข้อมูล',
    icon: <Table className="h-4 w-4" />
  }
];

// Helper function to get widget by type
export function getWidgetDefinition(type: WidgetType): WidgetDefinition | undefined {
  return WIDGET_REGISTRY[type];
}

// Helper function to get widgets by category
export function getWidgetsByCategory(category: string): WidgetDefinition[] {
  return Object.values(WIDGET_REGISTRY).filter(widget => widget.category === category);
}
