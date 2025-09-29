import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye,
  MapPin,
  Clock
} from "lucide-react";

interface SensorReading {
  id: string;
  type: "temperature" | "humidity" | "wind" | "soil" | "visibility";
  value: number;
  unit: string;
  status: "normal" | "warning" | "critical";
  location: string;
  timestamp: string;
}

const sensorData: SensorReading[] = [
  {
    id: "1",
    type: "temperature",
    value: 24.5,
    unit: "°C",
    status: "normal",
    location: "Field A",
    timestamp: "2 min ago"
  },
  {
    id: "2",
    type: "humidity",
    value: 68,
    unit: "%",
    status: "normal",
    location: "Field A",
    timestamp: "2 min ago"
  },
  {
    id: "3",
    type: "wind",
    value: 12.3,
    unit: "km/h",
    status: "warning",
    location: "Field B",
    timestamp: "3 min ago"
  },
  {
    id: "4",
    type: "soil",
    value: 42,
    unit: "%",
    status: "critical",
    location: "Field C",
    timestamp: "5 min ago"
  }
];

const sensorConfig = {
  temperature: {
    icon: Thermometer,
    color: "text-orange-500",
    bgColor: "bg-orange-50"
  },
  humidity: {
    icon: Droplets,
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  wind: {
    icon: Wind,
    color: "text-gray-500",
    bgColor: "bg-gray-50"
  },
  soil: {
    icon: Droplets,
    color: "text-earth-brown",
    bgColor: "bg-earth-brown/10"
  },
  visibility: {
    icon: Eye,
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  }
};

const statusConfig = {
  normal: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  critical: "bg-danger text-danger-foreground"
};

export function SensorData() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Live Sensor Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sensorData.map((sensor) => {
            const config = sensorConfig[sensor.type];
            const Icon = config.icon;
            
            return (
              <div key={sensor.id} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-surface/50 transition-colors">
                <div className={`p-2 rounded-lg ${config.bgColor}`}>
                  <Icon className={`h-5 w-5 ${config.color}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium capitalize">{sensor.type}</div>
                    <Badge className={statusConfig[sensor.status]}>
                      {sensor.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-3">
                    <span>{sensor.location}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {sensor.timestamp}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xl font-bold">{sensor.value}</div>
                  <div className="text-xs text-muted-foreground">{sensor.unit}</div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-field rounded-lg">
          <div className="text-sm font-medium text-foreground/90 mb-2">
            Environmental Conditions
          </div>
          <div className="text-xs text-foreground/70">
            Optimal spraying conditions detected for zones A & B. 
            High wind in zone C - consider postponing treatment.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}