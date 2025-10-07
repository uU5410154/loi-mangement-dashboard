import { useState, useEffect } from "react";
import { DashboardHeader } from "./components/DashboardHeader";
import { FilterPanel } from "./components/FilterPanel";
import { DashboardGrid } from "./components/dashboard/DashboardGrid";
import { CustomizationPanel } from "./components/dashboard/CustomizationPanel";
import { useDashboardStore } from "./store/dashboardStore";
import { WidgetInstance } from "./types/dashboard";

export default function AppDemo() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    bu: [],
    status: [],
    pic: [],
    contractType: [],
    fileSource: [],
    confidenceThreshold: [75],
    showSLAMissed: false
  });

  const { currentDashboard, addWidget } = useDashboardStore();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Initialize demo widgets if dashboard is empty
  useEffect(() => {
    if (currentDashboard && currentDashboard.widgets.length === 0) {
      // Add demo metric cards
      const demoWidgets: WidgetInstance[] = [
        {
          id: 'widget-1',
          type: 'metric-card',
          config: {
            metricType: 'total_contracts',
            timeRange: '7d',
            displayOptions: {
              showTrend: true,
              showComparison: true
            }
          },
          position: { x: 0, y: 0, w: 3, h: 2 },
          minW: 2,
          minH: 2
        },
        {
          id: 'widget-2',
          type: 'metric-card',
          config: {
            metricType: 'checked_contracts',
            timeRange: '7d',
            displayOptions: {
              showTrend: true,
              showComparison: true
            }
          },
          position: { x: 3, y: 0, w: 3, h: 2 },
          minW: 2,
          minH: 2
        },
        {
          id: 'widget-3',
          type: 'metric-card',
          config: {
            metricType: 'ocr_confidence',
            timeRange: '7d',
            displayOptions: {
              showTrend: true,
              showComparison: true
            }
          },
          position: { x: 6, y: 0, w: 3, h: 2 },
          minW: 2,
          minH: 2
        },
        {
          id: 'widget-4',
          type: 'metric-card',
          config: {
            metricType: 'accuracy_rate',
            timeRange: '7d',
            displayOptions: {
              showTrend: true,
              showComparison: true
            }
          },
          position: { x: 9, y: 0, w: 3, h: 2 },
          minW: 2,
          minH: 2
        }
      ];

      demoWidgets.forEach(widget => addWidget(widget));
    }
  }, [currentDashboard, addWidget]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <div className="flex">
        {/* Filter Panel */}
        <FilterPanel
          isCollapsed={isFilterCollapsed}
          onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard Customization Demo</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Click the edit button in the bottom right to customize your dashboard
            </p>
          </div>

          {/* Dashboard Grid */}
          <DashboardGrid />

          {/* Customization Panel (Floating) */}
          <CustomizationPanel />
        </main>
      </div>
    </div>
  );
}
