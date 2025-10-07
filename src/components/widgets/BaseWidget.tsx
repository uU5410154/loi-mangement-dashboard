import React, { useState } from 'react';
import { GripVertical, Settings, X, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';
import { WidgetProps } from '../../types/widget';

interface BaseWidgetProps extends WidgetProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

export function BaseWidget({
  id,
  type,
  config,
  isEditMode = false,
  onConfigChange,
  onRemove,
  children,
  title,
  subtitle,
  isLoading = false,
  error,
  className
}: BaseWidgetProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Open configuration dialog
    console.log('Open settings for widget:', id);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove && window.confirm('Are you sure you want to remove this widget?')) {
      onRemove();
    }
  };

  return (
    <Card
      className={cn(
        'relative h-full w-full transition-shadow',
        isEditMode && 'ring-2 ring-primary/20',
        isHovered && isEditMode && 'ring-primary/40 shadow-lg',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Drag Handle - Only visible in edit mode */}
      {isEditMode && (
        <div
          className={cn(
            'absolute -top-3 left-1/2 -translate-x-1/2 z-10',
            'bg-primary text-primary-foreground rounded-md px-2 py-1',
            'cursor-move transition-opacity',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
          data-drag-handle
        >
          <GripVertical className="h-4 w-4" />
        </div>
      )}

      {/* Widget Controls - Only visible in edit mode */}
      {isEditMode && (
        <div
          className={cn(
            'absolute -top-3 -right-3 z-10 flex gap-1',
            'transition-opacity',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          {onConfigChange && (
            <Button
              variant="secondary"
              size="icon"
              className="h-7 w-7 rounded-full shadow-md"
              onClick={handleSettingsClick}
            >
              <Settings className="h-3 w-3" />
            </Button>
          )}
          {onRemove && (
            <Button
              variant="destructive"
              size="icon"
              className="h-7 w-7 rounded-full shadow-md"
              onClick={handleRemoveClick}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}

      {/* Widget Header (Optional) */}
      {(title || subtitle) && (
        <CardHeader className="pb-3">
          {title && (
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            </div>
          )}
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </CardHeader>
      )}

      {/* Widget Content */}
      <CardContent className={cn(title || subtitle ? 'pt-0' : '')}>
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center h-full min-h-[100px]">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex items-center justify-center h-full min-h-[100px]">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="rounded-full bg-destructive/10 p-3">
                <X className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Error Loading Widget</p>
                <p className="text-xs text-muted-foreground mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Widget Content */}
        {!isLoading && !error && children}
      </CardContent>

      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="absolute bottom-2 left-2 text-[10px] text-muted-foreground/50 font-mono">
          {type} • {id.slice(0, 8)}
        </div>
      )}
    </Card>
  );
}

// Error Boundary for widgets
export class WidgetErrorBoundary extends React.Component<
  { children: React.ReactNode; widgetId: string },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; widgetId: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Widget ${this.props.widgetId} error:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="h-full w-full">
          <CardContent className="flex items-center justify-center h-full min-h-[100px]">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="rounded-full bg-destructive/10 p-3">
                <X className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Widget Error</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {this.state.error?.message || 'Something went wrong'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}
