import { MetricType, AggregationType } from './dashboard';

export interface MetricDefinition {
  type: MetricType;
  name: string;
  nameThai: string;
  description: string;
  descriptionThai: string;
  unit: 'number' | 'percentage' | 'time' | 'currency';
  category: 'contract' | 'performance' | 'quality' | 'system';
  aggregations: AggregationType[];
  source: string;
  icon: string;
  color: string;
}

export interface MetricQuery {
  metricType: MetricType;
  timeRange?: {
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
  groupBy?: string[];
}

export interface MetricResponse {
  metricType: MetricType;
  value: number | string;
  previousValue?: number | string;
  change?: {
    absolute: number;
    percentage: number;
    direction: 'up' | 'down' | 'stable';
  };
  trend?: Array<{
    date: string;
    value: number;
  }>;
  metadata?: Record<string, any>;
  timestamp: Date;
}

export interface TimeSeriesData {
  date: string;
  [key: string]: number | string;
}
