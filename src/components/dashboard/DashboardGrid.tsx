import React, { useCallback } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import { useDashboardStore } from '../../store/dashboardStore';
import { WidgetErrorBoundary } from '../widgets/BaseWidget';
import { getWidgetDefinition } from '../../config/widgetRegistry';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface DashboardGridProps {
  className?: string;
}

export function DashboardGrid({ className }: DashboardGridProps) {
  const {
    currentDashboard,
    isEditMode,
    updateLayout,
    updateWidget
  } = useDashboardStore();

  // Convert widgets to layout format for React-Grid-Layout
  const layout: Layout[] = currentDashboard?.widgets.map(widget => ({
    i: widget.id,
    x: widget.position.x,
    y: widget.position.y,
    w: widget.position.w,
    h: widget.position.h,
    minW: widget.minW,
    minH: widget.minH,
    maxW: widget.maxW,
    maxH: widget.maxH,
    isDraggable: isEditMode,
    isResizable: isEditMode
  })) || [];

  // Handle layout change
  const handleLayoutChange = useCallback((newLayout: Layout[]) => {
    if (!isEditMode) return;

    // Update widget positions
    newLayout.forEach(layoutItem => {
      const widget = currentDashboard?.widgets.find(w => w.id === layoutItem.i);
      if (widget) {
        updateWidget(widget.id, {
          position: {
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h
          }
        });
      }
    });

    updateLayout(newLayout);
  }, [isEditMode, currentDashboard, updateWidget, updateLayout]);

  if (!currentDashboard) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No dashboard loaded</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={80}
        width={1200}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        compactType="vertical"
        preventCollision={false}
        onLayoutChange={handleLayoutChange}
        draggableHandle="[data-drag-handle]"
        margin={[16, 16]}
        containerPadding={[0, 0]}
      >
        {currentDashboard.widgets.map(widget => {
          const widgetDef = getWidgetDefinition(widget.type);

          if (!widgetDef) {
            return (
              <div key={widget.id}>
                <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
                  Unknown widget type: {widget.type}
                </div>
              </div>
            );
          }

          const WidgetComponent = widgetDef.component;

          return (
            <div key={widget.id}>
              <WidgetErrorBoundary widgetId={widget.id}>
                <WidgetComponent
                  id={widget.id}
                  type={widget.type}
                  config={widget.config}
                  isEditMode={isEditMode}
                  onConfigChange={(config) => updateWidget(widget.id, { config })}
                  onRemove={() => {
                    // Remove widget handled by BaseWidget
                  }}
                />
              </WidgetErrorBoundary>
            </div>
          );
        })}
      </GridLayout>

      {/* Grid Guidelines (visible in edit mode) */}
      {isEditMode && (
        <style>{`
          .react-grid-layout {
            background-image:
              repeating-linear-gradient(
                0deg,
                hsl(var(--border)) 0px,
                transparent 1px,
                transparent 80px,
                hsl(var(--border)) 80px
              ),
              repeating-linear-gradient(
                90deg,
                hsl(var(--border)) 0px,
                transparent 1px,
                transparent calc(100% / 12),
                hsl(var(--border)) calc(100% / 12)
              );
            background-size: 100% 80px, calc(100% / 12) 100%;
          }
          .react-grid-item.react-grid-placeholder {
            background: hsl(var(--primary) / 0.2);
            border: 2px dashed hsl(var(--primary));
            border-radius: 0.5rem;
          }
          .react-grid-item.resizing {
            opacity: 0.9;
            z-index: 100;
          }
          .react-grid-item > .react-resizable-handle {
            background-image: none;
          }
          .react-grid-item > .react-resizable-handle::after {
            content: '';
            position: absolute;
            right: 3px;
            bottom: 3px;
            width: 8px;
            height: 8px;
            border-right: 2px solid hsl(var(--primary));
            border-bottom: 2px solid hsl(var(--primary));
          }
        `}</style>
      )}
    </div>
  );
}
