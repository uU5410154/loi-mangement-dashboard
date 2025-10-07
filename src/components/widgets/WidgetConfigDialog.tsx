import { useState, useEffect } from 'react';
import { Settings, X, Save } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { WidgetConfig, TimeRange, MetricType } from '../../types/dashboard';
import { METRICS_CONFIG, METRIC_CATEGORIES } from '../../config/metricsConfig';

interface WidgetConfigDialogProps {
  open: boolean;
  onClose: () => void;
  config: WidgetConfig;
  onSave: (config: WidgetConfig) => void;
  requiresMetric?: boolean;
}

export function WidgetConfigDialog({
  open,
  onClose,
  config,
  onSave,
  requiresMetric = true
}: WidgetConfigDialogProps) {
  const [localConfig, setLocalConfig] = useState<WidgetConfig>(config);

  useEffect(() => {
    setLocalConfig(config);
  }, [config, open]);

  const handleSave = () => {
    onSave(localConfig);
    onClose();
  };

  const updateConfig = (updates: Partial<WidgetConfig>) => {
    setLocalConfig(prev => ({ ...prev, ...updates }));
  };

  const updateDisplayOptions = (updates: Partial<WidgetConfig['displayOptions']>) => {
    setLocalConfig(prev => ({
      ...prev,
      displayOptions: { ...prev.displayOptions, ...updates }
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Widget Configuration
          </DialogTitle>
          <DialogDescription>
            Customize your widget settings and appearance
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="data" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* Data Configuration Tab */}
          <TabsContent value="data" className="space-y-4 mt-4">
            {requiresMetric && (
              <>
                {/* Metric Selection */}
                <div className="space-y-2">
                  <Label>Metric Type</Label>
                  <Select
                    value={localConfig.metricType}
                    onValueChange={(value) => updateConfig({ metricType: value as MetricType })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a metric" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(METRIC_CATEGORIES).map(([categoryKey, category]) => (
                        <div key={categoryKey}>
                          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                            {category.nameThai} ({category.name})
                          </div>
                          {category.metrics.map((metricType) => {
                            const metric = METRICS_CONFIG[metricType as MetricType];
                            return (
                              <SelectItem key={metricType} value={metricType}>
                                <div>
                                  <div className="font-medium">{metric.nameThai}</div>
                                  <div className="text-xs text-muted-foreground">{metric.name}</div>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                  {localConfig.metricType && (
                    <p className="text-xs text-muted-foreground">
                      {METRICS_CONFIG[localConfig.metricType].descriptionThai}
                    </p>
                  )}
                </div>

                <Separator />
              </>
            )}

            {/* Time Range */}
            <div className="space-y-2">
              <Label>Time Range</Label>
              <Select
                value={localConfig.timeRange}
                onValueChange={(value) => updateConfig({ timeRange: value as TimeRange })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 วัน (7 Days)</SelectItem>
                  <SelectItem value="30d">30 วัน (30 Days)</SelectItem>
                  <SelectItem value="90d">90 วัน (90 Days)</SelectItem>
                  <SelectItem value="custom">กำหนดเอง (Custom)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Aggregation */}
            {requiresMetric && localConfig.metricType && (
              <div className="space-y-2">
                <Label>Aggregation</Label>
                <Select
                  value={localConfig.aggregation || 'avg'}
                  onValueChange={(value) => updateConfig({ aggregation: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {METRICS_CONFIG[localConfig.metricType].aggregations.map((agg) => (
                      <SelectItem key={agg} value={agg}>
                        {agg.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </TabsContent>

          {/* Display Options Tab */}
          <TabsContent value="display" className="space-y-4 mt-4">
            {/* Custom Title */}
            <div className="space-y-2">
              <Label>Custom Title</Label>
              <Input
                placeholder="Leave empty for default"
                value={localConfig.displayOptions?.title || ''}
                onChange={(e) => updateDisplayOptions({ title: e.target.value })}
              />
            </div>

            {/* Custom Subtitle */}
            <div className="space-y-2">
              <Label>Custom Subtitle</Label>
              <Input
                placeholder="Leave empty for default"
                value={localConfig.displayOptions?.subtitle || ''}
                onChange={(e) => updateDisplayOptions({ subtitle: e.target.value })}
              />
            </div>

            <Separator />

            {/* Show Trend */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Trend Indicator</Label>
                <p className="text-xs text-muted-foreground">
                  Display up/down arrows and percentage change
                </p>
              </div>
              <Switch
                checked={localConfig.displayOptions?.showTrend ?? true}
                onCheckedChange={(checked) => updateDisplayOptions({ showTrend: checked })}
              />
            </div>

            {/* Show Comparison */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Comparison</Label>
                <p className="text-xs text-muted-foreground">
                  Show additional comparison information
                </p>
              </div>
              <Switch
                checked={localConfig.displayOptions?.showComparison ?? true}
                onCheckedChange={(checked) => updateDisplayOptions({ showComparison: checked })}
              />
            </div>

            {/* Custom Color */}
            <div className="space-y-2">
              <Label>Custom Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  className="w-16 h-10"
                  value={localConfig.displayOptions?.color || '#0471d1'}
                  onChange={(e) => updateDisplayOptions({ color: e.target.value })}
                />
                <Input
                  placeholder="#0471d1"
                  value={localConfig.displayOptions?.color || ''}
                  onChange={(e) => updateDisplayOptions({ color: e.target.value })}
                />
              </div>
            </div>
          </TabsContent>

          {/* Advanced Options Tab */}
          <TabsContent value="advanced" className="space-y-4 mt-4">
            {/* Filters */}
            <div className="space-y-2">
              <Label>Filters (Coming Soon)</Label>
              <p className="text-xs text-muted-foreground">
                Advanced filtering options will be available here
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" disabled size="sm">
                  Business Unit
                </Button>
                <Button variant="outline" disabled size="sm">
                  Status
                </Button>
                <Button variant="outline" disabled size="sm">
                  PIC
                </Button>
                <Button variant="outline" disabled size="sm">
                  Contract Type
                </Button>
              </div>
            </div>

            <Separator />

            {/* Preview */}
            <div className="space-y-2">
              <Label>Configuration Preview</Label>
              <div className="bg-muted rounded-lg p-3 text-xs font-mono">
                <pre className="overflow-x-auto">
                  {JSON.stringify(localConfig, null, 2)}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
