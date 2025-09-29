import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const plantDetectionData = [
  { date: "Jan", healthy: 85, pests: 10, disease: 3, critical: 2 },
  { date: "Feb", healthy: 78, pests: 15, disease: 5, critical: 2 },
  { date: "Mar", healthy: 82, pests: 12, disease: 4, critical: 2 },
  { date: "Apr", healthy: 70, pests: 20, disease: 7, critical: 3 },
  { date: "May", healthy: 88, pests: 8, disease: 3, critical: 1 },
  { date: "Jun", healthy: 92, pests: 6, disease: 2, critical: 0 },
  { date: "Jul", healthy: 95, pests: 4, disease: 1, critical: 0 }
];

const pesticideUsageData = [
  { month: "Jan", traditional: 45, targeted: 18 },
  { month: "Feb", traditional: 52, targeted: 21 },
  { month: "Mar", traditional: 38, targeted: 15 },
  { month: "Apr", traditional: 65, targeted: 23 },
  { month: "May", traditional: 28, targeted: 12 },
  { month: "Jun", traditional: 22, targeted: 8 },
  { month: "Jul", traditional: 18, targeted: 6 }
];

export function AnalyticsChart() {
  const totalSavings = pesticideUsageData.reduce((acc, curr) => acc + (curr.traditional - curr.targeted), 0);
  const avgEfficiency = ((totalSavings / pesticideUsageData.reduce((acc, curr) => acc + curr.traditional, 0)) * 100).toFixed(1);
  const currentHealthy = plantDetectionData[plantDetectionData.length - 1].healthy;
  const currentIssues = plantDetectionData[plantDetectionData.length - 1].pests + 
                       plantDetectionData[plantDetectionData.length - 1].disease + 
                       plantDetectionData[plantDetectionData.length - 1].critical;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Plant Detection Trends */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Individual Plant Detection Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={plantDetectionData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="healthy" 
                stackId="1"
                stroke="hsl(var(--success))" 
                fill="hsl(var(--success))" 
                fillOpacity={0.6}
                name="Healthy Plants"
              />
              <Area 
                type="monotone" 
                dataKey="pests" 
                stackId="1"
                stroke="hsl(var(--warning))" 
                fill="hsl(var(--warning))" 
                fillOpacity={0.6}
                name="Pest Detected"
              />
              <Area 
                type="monotone" 
                dataKey="disease" 
                stackId="1"
                stroke="hsl(var(--earth-clay))" 
                fill="hsl(var(--earth-clay))" 
                fillOpacity={0.6}
                name="Disease Detected"
              />
              <Area 
                type="monotone" 
                dataKey="critical" 
                stackId="1"
                stroke="hsl(var(--danger))" 
                fill="hsl(var(--danger))" 
                fillOpacity={0.6}
                name="Critical Cases"
              />
            </AreaChart>
          </ResponsiveContainer>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-success-light rounded-lg">
              <div className="text-lg font-bold text-success">{currentHealthy}%</div>
              <div className="text-xs text-success-foreground/70">Current Healthy</div>
            </div>
            <div className="text-center p-3 bg-warning-light rounded-lg">
              <div className="text-lg font-bold text-warning">{currentIssues}%</div>
              <div className="text-xs text-warning-foreground/70">Issues Detected</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pesticide Usage Efficiency */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Targeted vs Traditional Application
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={pesticideUsageData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="traditional" 
                stroke="hsl(var(--earth-clay))" 
                strokeWidth={2}
                name="Traditional Method (ml/plant)"
              />
              <Line 
                type="monotone" 
                dataKey="targeted" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="AI Targeted (ml/plant)"
              />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Chemical Saved</span>
              <Badge className="bg-success text-success-foreground">
                {totalSavings}ml per month
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Efficiency Gain</span>
              <Badge className="bg-primary text-primary-foreground">
                {avgEfficiency}% reduction
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}