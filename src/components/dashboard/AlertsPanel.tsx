import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, CheckCircle, Clock, X } from "lucide-react";
import { useState } from "react";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  zone?: string;
  actionRequired: boolean;
}

const alertsData: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "High Infection Detected",
    message: "Zone C showing 65% infection rate. Immediate treatment recommended.",
    timestamp: "5 min ago",
    zone: "Zone C",
    actionRequired: true
  },
  {
    id: "2",
    type: "warning", 
    title: "Weather Alert",
    message: "High wind conditions in Zone B may affect spray coverage.",
    timestamp: "15 min ago",
    zone: "Zone B",
    actionRequired: false
  },
  {
    id: "3",
    type: "info",
    title: "Treatment Completed",
    message: "Automated spraying completed successfully in Zone A.",
    timestamp: "1 hour ago",
    zone: "Zone A",
    actionRequired: false
  },
  {
    id: "4",
    type: "warning",
    title: "Low Pesticide Level",
    message: "Tank level below 20%. Refill recommended before next treatment.",
    timestamp: "2 hours ago",
    actionRequired: true
  }
];

const alertConfig = {
  critical: {
    icon: AlertTriangle,
    color: "bg-danger text-danger-foreground",
    bgColor: "bg-danger-light",
    borderColor: "border-danger"
  },
  warning: {
    icon: AlertTriangle,
    color: "bg-warning text-warning-foreground",
    bgColor: "bg-warning-light",
    borderColor: "border-warning"
  },
  info: {
    icon: CheckCircle,
    color: "bg-success text-success-foreground",
    bgColor: "bg-success-light",
    borderColor: "border-success"
  }
};

export function AlertsPanel() {
  const [alerts, setAlerts] = useState(alertsData);

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const criticalCount = alerts.filter(alert => alert.type === "critical").length;
  const actionRequiredCount = alerts.filter(alert => alert.actionRequired).length;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            System Alerts
            {criticalCount > 0 && (
              <Badge className="bg-danger text-danger-foreground ml-2">
                {criticalCount} Critical
              </Badge>
            )}
          </CardTitle>
          <Badge variant="outline">
            {actionRequiredCount} Action Required
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 text-success" />
              <div className="font-medium">All clear!</div>
              <div className="text-sm">No active alerts at this time.</div>
            </div>
          ) : (
            alerts.map((alert) => {
              const config = alertConfig[alert.type];
              const Icon = config.icon;
              
              return (
                <div 
                  key={alert.id} 
                  className={`p-3 rounded-lg border-l-4 ${config.borderColor} ${config.bgColor} relative group`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1 rounded ${config.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm">{alert.title}</div>
                        <div className="flex items-center gap-2">
                          {alert.zone && (
                            <Badge variant="outline" className="text-xs">
                              {alert.zone}
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dismissAlert(alert.id)}
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-sm text-foreground/80 mt-1">
                        {alert.message}
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {alert.timestamp}
                        </div>
                        
                        {alert.actionRequired && (
                          <Button variant="outline" size="sm" className="h-6 text-xs">
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        {alerts.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setAlerts([])}
            >
              Clear All Alerts
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}