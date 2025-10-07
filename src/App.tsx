import { useState, useEffect } from "react";
import { DashboardHeader } from "./components/DashboardHeader";
import { FilterPanel } from "./components/FilterPanel";
import { ContractSummaryCard } from "./components/ContractSummaryCard";
import { KPICards } from "./components/KPICards";
import { TrendCharts } from "./components/TrendCharts";
import { DataQualityCharts } from "./components/DataQualityCharts";
import { SystemHealthCards } from "./components/SystemHealthCards";
import { DataTable } from "./components/DataTable";
import { Separator } from "./components/ui/separator";

export default function App() {
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
        <main className="flex-1 p-6 space-y-8">
          {/* Contract Summary Card - Top Left */}
          <section>
            <ContractSummaryCard />
          </section>

          <Separator />

          {/* Hero KPI Cards */}
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">ภาพรวมประจำสัปดาห์</h2>
              <p className="text-sm text-muted-foreground">Weekly Overview</p>
            </div>
            <KPICards />
          </section>

          <Separator />

          {/* Trend & Performance Charts */}
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">แนวโน้มและประสิทธิภาพ</h2>
              <p className="text-sm text-muted-foreground">Trend & Performance</p>
            </div>
            <TrendCharts />
          </section>

          <Separator />

          {/* AI/RPA & Data Quality */}
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">AI/RPA และคุณภาพข้อมูล</h2>
              <p className="text-sm text-muted-foreground">AI/RPA & Data Quality</p>
            </div>
            <DataQualityCharts />
          </section>

          <Separator />

          {/* System Health */}
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">สุขภาพระบบ</h2>
              <p className="text-sm text-muted-foreground">System Health</p>
            </div>
            <SystemHealthCards />
          </section>

          <Separator />

          {/* Data Tables */}
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">ข้อมูลรายละเอียด</h2>
              <p className="text-sm text-muted-foreground">Detailed Data</p>
            </div>
            <DataTable />
          </section>
        </main>
      </div>
    </div>
  );
}