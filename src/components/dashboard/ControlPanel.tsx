import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Droplets, Play, Pause, Settings, Zap } from "lucide-react";
import { useState } from "react";
import droneImage from "@/assets/agricultural-drone.jpg";

export function ControlPanel() {
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [dosage, setDosage] = useState([65]);

  return (
    <Card className="shadow-card overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-primary" />
          Pesticide Control System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Drone Visual */}
        <div className="relative overflow-hidden rounded-lg">
          <img 
            src={droneImage} 
            alt="Agricultural drone for pesticide spraying"
            className="w-full h-32 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
          <div className="absolute bottom-2 left-2 text-white">
            <div className="text-sm font-medium">Drone Unit Alpha-7</div>
            <div className="text-xs opacity-90">Precision Spraying System</div>
          </div>
        </div>
        {/* Mode Toggle */}
        <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium">AI Smart Mode</div>
              <div className="text-sm text-muted-foreground">
                Automatic dosage control based on infection levels
              </div>
            </div>
          </div>
          <Switch 
            checked={isAutoMode} 
            onCheckedChange={setIsAutoMode}
          />
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="font-medium">System Status</span>
          <Badge 
            className={isActive 
              ? "bg-success text-success-foreground" 
              : "bg-muted text-muted-foreground"
            }
          >
            {isActive ? "Active" : "Standby"}
          </Badge>
        </div>

        {/* Dosage Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Pesticide Dosage</span>
            <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
              {dosage[0]}%
            </span>
          </div>
          <Slider
            value={dosage}
            onValueChange={setDosage}
            max={100}
            step={5}
            className="w-full"
            disabled={isAutoMode}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low</span>
            <span>Optimal: 60-80%</span>
            <span>High</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={() => setIsActive(!isActive)}
            className={isActive 
              ? "bg-danger hover:bg-danger/90 text-danger-foreground" 
              : "bg-gradient-primary text-primary-foreground hover:shadow-glow"
            }
          >
            {isActive ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Stop Treatment
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Treatment
              </>
            )}
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Calibrate Dosage
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">72ml</div>
            <div className="text-xs text-muted-foreground">Per Plant Avg</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-success">-67%</div>
            <div className="text-xs text-muted-foreground">Chemical Reduction</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}