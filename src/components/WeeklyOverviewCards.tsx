import { TrendingUp, TrendingDown, Database, Eye, Activity, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface KPICardProps {
  title: string;
  subtitle: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon: React.ReactNode;
  color?: 'blue' | 'yellow' | 'green';
}

function KPICard({ title, subtitle, value, change, icon, color = 'blue' }: KPICardProps) {
  const colorClasses = {
    blue: 'text-[#0471d1] bg-[#0471d1]/10',
    yellow: 'text-[#fbc41e] bg-[#fbc41e]/10',
    green: 'text-green-600 bg-green-50 dark:bg-green-900/20'
  };

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <div>
            <div className="text-foreground">{title}</div>
            <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
          </div>
        </CardTitle>
        <div className={`rounded-md p-2 ${colorClasses[color]}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">{value}</div>
          {change && (
            <div className="flex items-center gap-1">
              {change.type === 'increase' ? (
                <TrendingUp className="h-3 w-3 text-[#0471d1]" />
              ) : (
                <TrendingDown className="h-3 w-3 text-[#fbc41e]" />
              )}
              <span className={`text-xs ${change.type === 'increase' ? 'text-[#0471d1]' : 'text-[#fbc41e]'}`}>
                {change.value > 0 ? '+' : ''}{change.value}%
              </span>
            </div>
          )}
        </div>
        {change && (
          <p className="text-xs text-muted-foreground mt-1">
            vs {change.period}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function WeeklyOverviewCards() {
  const weeklyKPIs = [
    {
      title: "จำนวนสัญญาทั้งหมดจาก Simplicity",
      subtitle: "Total Contracts from Simplicity",
      value: "2,384",
      change: { value: 5.2, type: 'increase' as const, period: 'last week' },
      icon: <Database className="h-4 w-4" />,
      color: 'blue' as const
    },
    {
      title: "ตรวจโดยระบบ LOI Autocheck",
      subtitle: "Checked by LOI Autocheck",
      value: "1,847",
      change: { value: 8.7, type: 'increase' as const, period: 'last week' },
      icon: <Eye className="h-4 w-4" />,
      color: 'blue' as const
    },
    {
      title: "ค่าความมั่นใจ OCR เฉลี่ย",
      subtitle: "Average OCR Confidence Level",
      value: "94.7%",
      change: { value: 1.8, type: 'increase' as const, period: 'last week' },
      icon: <Activity className="h-4 w-4" />,
      color: 'green' as const
    },
    {
      title: "อัตราความแม่นยำเฉลี่ย",
      subtitle: "Average Accuracy Rate",
      value: "91.2%",
      change: { value: 2.3, type: 'increase' as const, period: 'last week' },
      icon: <Target className="h-4 w-4" />,
      color: 'green' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {weeklyKPIs.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
}
