import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, AlertTriangle, CheckCircle, Bug, Microscope } from "lucide-react";

interface PlantHealthData {
  plantId: string;
  plantType: string;
  status: "healthy" | "pest_detected" | "disease_detected" | "critical";
  infectionType?: string;
  confidenceLevel: number;
  recommendedDosage: number;
  location: { row: number; column: number };
  lastScan: string;
}

interface PlantHealthCardProps {
  data: PlantHealthData;
}

const statusConfig = {
  healthy: {
    icon: CheckCircle,
    color: "bg-success text-success-foreground",
    gradient: "bg-gradient-success",
    label: "Healthy",
    bgColor: "bg-success-light"
  },
  pest_detected: {
    icon: Bug,
    color: "bg-warning text-warning-foreground",
    gradient: "bg-gradient-sky",
    label: "Pest Detected",
    bgColor: "bg-warning-light"
  },
  disease_detected: {
    icon: Microscope,
    color: "bg-warning text-warning-foreground",
    gradient: "bg-gradient-sky",
    label: "Disease Detected",
    bgColor: "bg-warning-light"
  },
  critical: {
    icon: AlertTriangle,
    color: "bg-danger text-danger-foreground",
    gradient: "bg-gradient-earth",
    label: "Critical Condition",
    bgColor: "bg-danger-light"
  }
};

export function PlantHealthCard({ data }: PlantHealthCardProps) {
  const config = statusConfig[data.status];
  const Icon = config.icon;

  return (
    <Card className="shadow-card hover:shadow-elevated transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            Plant {data.plantId}
          </CardTitle>
          <Badge className={config.color}>
            {config.label}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {data.plantType} • Row {data.location.row}, Col {data.location.column}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${config.gradient}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-2xl font-bold">{data.confidenceLevel}%</div>
              <div className="text-sm text-muted-foreground">AI Confidence</div>
            </div>
          </div>
          
          {data.infectionType && (
            <div className={`p-3 rounded-lg ${config.bgColor}`}>
              <div className="text-sm font-medium">Detected Issue</div>
              <div className="text-xs text-muted-foreground mt-1">{data.infectionType}</div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-surface rounded-lg">
              <div className="font-bold text-primary">{data.recommendedDosage}ml</div>
              <div className="text-xs text-muted-foreground">Rec. Dosage</div>
            </div>
            <div className="text-center p-2 bg-surface rounded-lg">
              <div className="font-bold text-success">
                {data.status === 'healthy' ? '0ml' : `${data.recommendedDosage}ml`}
              </div>
              <div className="text-xs text-muted-foreground">Applied</div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Last scan: {data.lastScan}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}