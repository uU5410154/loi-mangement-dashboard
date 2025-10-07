import { ReactNode } from 'react';
import { WidgetType, WidgetConfig, MetricData } from './dashboard';

export interface WidgetProps {
  id: string;
  type: WidgetType;
  config: WidgetConfig;
  data?: MetricData | MetricData[];
  isEditMode?: boolean;
  onConfigChange?: (config: WidgetConfig) => void;
  onRemove?: () => void;
}

export interface WidgetDefinition {
  type: WidgetType;
  name: string;
  nameThai: string;
  description: string;
  descriptionThai: string;
  icon: ReactNode;
  category: 'overview' | 'analytics' | 'performance' | 'system' | 'data';
  defaultConfig: WidgetConfig;
  defaultSize: {
    w: number;
    h: number;
  };
  minSize: {
    w: number;
    h: number;
  };
  maxSize?: {
    w: number;
    h: number;
  };
  component: React.ComponentType<WidgetProps>;
  configurable: boolean;
  requiresMetric: boolean;
}

export interface WidgetCategory {
  id: string;
  name: string;
  nameThai: string;
  icon: ReactNode;
}
