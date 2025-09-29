import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Settings, 
  User, 
  Sprout,
  WifiOff,
  Wifi
} from "lucide-react";
import { useState } from "react";

export function DashboardHeader() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <header className="bg-gradient-primary text-primary-foreground shadow-elevated">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Sprout className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">HyDRA: Hybrid Drone–AGV for Smart Agriculture</h1>
              <p className="text-primary-foreground/80 text-sm">
                Intelligent Pesticide Sprinkling System
              </p>
            </div>
          </div>

          {/* Status & Actions */}
          <div className="flex items-center gap-4">
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              {isOnline ? (
                <Badge className="bg-success text-success-foreground">
                  <Wifi className="h-3 w-3 mr-1" />
                  Online
                </Badge>
              ) : (
                <Badge className="bg-danger text-danger-foreground">
                  <WifiOff className="h-3 w-3 mr-1" />
                  Offline
                </Badge>
              )}
            </div>

            {/* System Status */}
            <div className="text-right text-sm">
              <div className="font-medium">System Active</div>
              <div className="text-primary-foreground/70">
                Last sync: 2 min ago
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-primary-foreground hover:bg-white/10"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-primary-foreground hover:bg-white/10"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-primary-foreground hover:bg-white/10"
              >
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-4 grid grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-lg font-bold">127</div>
            <div className="text-xs text-primary-foreground/80">Plants Monitored</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-lg font-bold">92%</div>
            <div className="text-xs text-primary-foreground/80">AI Accuracy</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-lg font-bold">18ml</div>
            <div className="text-xs text-primary-foreground/80">Avg Per Plant</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-lg font-bold">67%</div>
            <div className="text-xs text-primary-foreground/80">Chemical Reduction</div>
          </div>
        </div>
      </div>
    </header>
  );
}