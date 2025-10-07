import { Layout } from 'react-grid-layout';

export type WidgetType =
  | 'metric-card'
  | 'chart'
  | 'table'
  | 'status'
  | 'contract-summary'
  | 'trend-chart'
  | 'data-quality'
  | 'system-health';

export type ChartType = 'line' | 'bar' | 'pie' | 'donut' | 'area' | 'stacked-bar';

export type MetricType =
  | 'total_contracts'
  | 'checked_contracts'
  | 'ocr_confidence'
  | 'accuracy_rate'
  | 'approved'
  | 'not_approved'
  | 'under_review'
  | 'processing_time'
  | 'manual_validation'
  | 'cycle_time'
  | 'backlog';

export type AggregationType = 'sum' | 'avg' | 'min' | 'max' | 'count';

export type TimeRange = '7d' | '30d' | '90d' | 'custom';

export interface WidgetConfig {
  metricType?: MetricType;
  chartType?: ChartType;
  timeRange?: TimeRange;
  customDateRange?: {
    from: Date;
    to: Date;
  };
  aggregation?: AggregationType;
  filters?: {
    bu?: string[];
    status?: string[];
    pic?: string[];
    contractType?: string[];
  };
  displayOptions?: {
    showTrend?: boolean;
    showComparison?: boolean;
    color?: string;
    title?: string;
    subtitle?: string;
  };
}

export interface WidgetInstance {
  id: string;
  type: WidgetType;
  config: WidgetConfig;
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

export interface DashboardLayout {
  id: string;
  name: string;
  userId?: string;
  layouts: Layout[];
  widgets: WidgetInstance[];
  isDefault?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserPreferences {
  userId: string;
  theme: 'light' | 'dark';
  defaultDashboardId?: string;
  defaultTimeRange: TimeRange;
  customMetrics?: MetricType[];
  notifications?: {
    enabled: boolean;
    emailAlerts?: boolean;
  };
}

export interface MetricData {
  metricType: MetricType;
  value: number | string;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  timestamp: Date;
  metadata?: Record<string, any>;
  source?: string;
}

export interface DashboardState {
  // Current dashboard
  currentDashboard: DashboardLayout | null;

  // Available dashboards
  dashboards: DashboardLayout[];

  // Edit mode
  isEditMode: boolean;

  // User preferences
  preferences: UserPreferences | null;

  // Data cache
  metricsData: Map<string, MetricData>;

  // Loading states
  isLoading: boolean;
  isSaving: boolean;

  // Actions
  setEditMode: (isEdit: boolean) => void;
  addWidget: (widget: WidgetInstance) => void;
  removeWidget: (id: string) => void;
  updateWidget: (id: string, updates: Partial<WidgetInstance>) => void;
  updateLayout: (layouts: Layout[]) => void;
  loadDashboard: (dashboardId: string) => Promise<void>;
  saveDashboard: () => Promise<void>;
  createDashboard: (name: string) => Promise<void>;
  deleteDashboard: (dashboardId: string) => Promise<void>;
  setPreferences: (prefs: Partial<UserPreferences>) => void;
  updateMetricData: (metricType: MetricType, data: MetricData) => void;
}
