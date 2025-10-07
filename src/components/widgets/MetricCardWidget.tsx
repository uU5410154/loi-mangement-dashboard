import { TrendingUp, TrendingDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { BaseWidget } from './BaseWidget';
import { WidgetProps } from '../../types/widget';
import { METRICS_CONFIG } from '../../config/metricsConfig';
import { useDashboardStore } from '../../store/dashboardStore';

export function MetricCardWidget(props: WidgetProps) {
  const { id, config, isEditMode, onConfigChange, onRemove } = props;
  const { metricsData } = useDashboardStore();

  // Get metric configuration
  const metricType = config.metricType || 'total_contracts';
  const metricConfig = METRICS_CONFIG[metricType];

  // Get metric data from store (or use mock data for now)
  const metricData = metricsData.get(metricType) || {
    metricType,
    value: getMockValue(metricType),
    change: getMockChange(metricType),
    timestamp: new Date()
  };

  // Get icon component
  const IconComponent = (Icons as any)[metricConfig.icon] || Icons.Activity;

  // Color configuration
  const colorClass = `text-[${metricConfig.color}] bg-[${metricConfig.color}]/10`;

  return (
    <BaseWidget
      {...props}
      title={config.displayOptions?.title || metricConfig.nameThai}
      subtitle={config.displayOptions?.subtitle || metricConfig.name}
    >
      <div className="space-y-2">
        {/* Icon and Value */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-3xl font-bold tabular-nums">
              {formatValue(metricData.value, metricConfig.unit)}
            </div>
          </div>
          <div className={`rounded-md p-2.5 ${colorClass}`}>
            <IconComponent className="h-5 w-5" />
          </div>
        </div>

        {/* Trend Indicator */}
        {config.displayOptions?.showTrend && metricData.change && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {metricData.change.type === 'increase' ? (
                <TrendingUp className="h-4 w-4 text-[#0471d1]" />
              ) : (
                <TrendingDown className="h-4 w-4 text-[#fbc41e]" />
              )}
              <span className={`text-sm font-medium ${
                metricData.change.type === 'increase' ? 'text-[#0471d1]' : 'text-[#fbc41e]'
              }`}>
                {metricData.change.value > 0 ? '+' : ''}{metricData.change.value}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              vs {metricData.change.period}
            </span>
          </div>
        )}

        {/* Additional Info */}
        {config.displayOptions?.showComparison && (
          <div className="text-xs text-muted-foreground">
            Source: {metricConfig.source}
          </div>
        )}
      </div>
    </BaseWidget>
  );
}

// Helper functions for mock data (will be replaced with real API calls)
function getMockValue(metricType: string): number | string {
  const mockValues: Record<string, number | string> = {
    total_contracts: 2384,
    checked_contracts: 1847,
    approved: 892,
    not_approved: 124,
    under_review: 347,
    ocr_confidence: 94.7,
    accuracy_rate: 91.2,
    processing_time: 2.4,
    manual_validation: 18.4,
    cycle_time: 6.8,
    backlog: 187
  };
  return mockValues[metricType] || 0;
}

function getMockChange(metricType: string) {
  const mockChanges: Record<string, any> = {
    total_contracts: { value: 5.2, type: 'increase', period: 'last week' },
    checked_contracts: { value: 8.7, type: 'increase', period: 'last week' },
    ocr_confidence: { value: 1.8, type: 'increase', period: 'last week' },
    accuracy_rate: { value: 2.3, type: 'increase', period: 'last week' }
  };
  return mockChanges[metricType] || { value: 0, type: 'increase', period: 'last week' };
}

function formatValue(value: number | string, unit: string): string {
  if (typeof value === 'string') return value;

  switch (unit) {
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'time':
      return `${value.toFixed(1)}m`;
    case 'currency':
      return `$${value.toLocaleString()}`;
    case 'number':
    default:
      return value.toLocaleString();
  }
}
