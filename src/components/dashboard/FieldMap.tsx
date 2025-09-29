import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Map, MapPin, Maximize2, RefreshCw, Leaf, Bug, Microscope } from "lucide-react";
import { useState } from "react";

interface IndividualPlant {
  id: string;
  plantType: string;
  status: "healthy" | "pest_detected" | "disease_detected" | "critical";
  position: { x: number; y: number };
  infectionType?: string;
  confidenceLevel: number;
  recommendedDosage: number;
  location: { row: number; column: number };
}

const individualPlants: IndividualPlant[] = [
  { 
    id: "P001", 
    plantType: "Tomato",
    status: "healthy", 
    position: { x: 15, y: 20 }, 
    confidenceLevel: 98,
    recommendedDosage: 0,
    location: { row: 1, column: 3 }
  },
  { 
    id: "P027", 
    plantType: "Corn",
    status: "pest_detected", 
    position: { x: 35, y: 30 }, 
    infectionType: "Aphid infestation",
    confidenceLevel: 87,
    recommendedDosage: 15,
    location: { row: 3, column: 8 }
  },
  { 
    id: "P045", 
    plantType: "Wheat",
    status: "disease_detected", 
    position: { x: 55, y: 45 }, 
    infectionType: "Early blight",
    confidenceLevel: 92,
    recommendedDosage: 22,
    location: { row: 5, column: 12 }
  },
  { 
    id: "P063", 
    plantType: "Soybean",
    status: "critical", 
    position: { x: 25, y: 65 }, 
    infectionType: "Severe fungal infection",
    confidenceLevel: 95,
    recommendedDosage: 35,
    location: { row: 7, column: 15 }
  },
  { 
    id: "P089", 
    plantType: "Tomato",
    status: "healthy", 
    position: { x: 70, y: 25 }, 
    confidenceLevel: 96,
    recommendedDosage: 0,
    location: { row: 2, column: 18 }
  },
  { 
    id: "P102", 
    plantType: "Corn",
    status: "pest_detected", 
    position: { x: 45, y: 70 }, 
    infectionType: "Spider mite detected",
    confidenceLevel: 89,
    recommendedDosage: 18,
    location: { row: 8, column: 11 }
  }
];

const statusColors = {
  healthy: "bg-success/80 border-success hover:bg-success/90",
  pest_detected: "bg-warning/80 border-warning hover:bg-warning/90",
  disease_detected: "bg-orange-500/80 border-orange-500 hover:bg-orange-500/90",
  critical: "bg-danger/80 border-danger hover:bg-danger/90"
};

const statusIcons = {
  healthy: Leaf,
  pest_detected: Bug,
  disease_detected: Microscope,
  critical: MapPin
};

export function FieldMap() {
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);
  const selectedPlantData = individualPlants.find(plant => plant.id === selectedPlant);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-primary" />
            Individual Plant Monitoring Field
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Scan All
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Field Visualization */}
          <div className="relative bg-gradient-field rounded-lg p-4 h-80 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-green-100/50 rounded-lg" />
            
            {individualPlants.map((plant) => {
              const StatusIcon = statusIcons[plant.status];
              return (
                <div
                  key={plant.id}
                  className={`absolute cursor-pointer transition-all duration-300 rounded-full border-2 p-2 hover:scale-110 ${statusColors[plant.status]} ${
                    selectedPlant === plant.id ? 'ring-2 ring-primary scale-110' : ''
                  }`}
                  style={{
                    left: `${plant.position.x}%`,
                    top: `${plant.position.y}%`,
                  }}
                  onClick={() => setSelectedPlant(selectedPlant === plant.id ? null : plant.id)}
                >
                  <StatusIcon className="h-4 w-4 text-white drop-shadow-lg" />
                  
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                    {plant.id} - {plant.plantType}
                  </div>
                </div>
              );
            })}
            
            {/* Legend */}
            <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <div className="text-xs font-medium mb-2">Plant Status</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <Leaf className="w-3 h-3 text-success" />
                  <span>Healthy</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bug className="w-3 h-3 text-warning" />
                  <span>Pest</span>
                </div>
                <div className="flex items-center gap-1">
                  <Microscope className="w-3 h-3 text-orange-500" />
                  <span>Disease</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-danger" />
                  <span>Critical</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Plant Details */}
          {selectedPlantData && (
            <div className="p-4 bg-surface rounded-lg border border-border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Plant {selectedPlantData.id} - {selectedPlantData.plantType}</h4>
                <Badge className={statusColors[selectedPlantData.status].includes('success') ? 'bg-success text-success-foreground' :
                                statusColors[selectedPlantData.status].includes('warning') ? 'bg-warning text-warning-foreground' :
                                statusColors[selectedPlantData.status].includes('orange') ? 'bg-orange-500 text-white' :
                                'bg-danger text-danger-foreground'}>
                  {selectedPlantData.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              
              {selectedPlantData.infectionType && (
                <div className="mb-3 p-2 bg-warning-light rounded text-sm">
                  <strong>Issue Detected:</strong> {selectedPlantData.infectionType}
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <div className="text-muted-foreground">AI Confidence</div>
                  <div className="font-medium">{selectedPlantData.confidenceLevel}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Recommended Dosage</div>
                  <div className="font-medium">{selectedPlantData.recommendedDosage}ml</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Location</div>
                  <div className="font-medium">R{selectedPlantData.location.row}C{selectedPlantData.location.column}</div>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-primary text-primary-foreground">
                {selectedPlantData.recommendedDosage > 0 ? 'Apply Treatment' : 'Monitor Plant'}
              </Button>
            </div>
          )}

          {/* Field Statistics */}
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-success-light rounded-lg">
              <div className="font-bold text-success">
                {individualPlants.filter(p => p.status === 'healthy').length}
              </div>
              <div className="text-xs text-success-foreground/70">Healthy Plants</div>
            </div>
            <div className="p-3 bg-warning-light rounded-lg">
              <div className="font-bold text-warning">
                {individualPlants.filter(p => p.status === 'pest_detected').length}
              </div>
              <div className="text-xs text-warning-foreground/70">Pest Detected</div>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <div className="font-bold text-orange-600">
                {individualPlants.filter(p => p.status === 'disease_detected').length}
              </div>
              <div className="text-xs text-orange-700/70">Disease Found</div>
            </div>
            <div className="p-3 bg-danger-light rounded-lg">
              <div className="font-bold text-danger">
                {individualPlants.filter(p => p.status === 'critical').length}
              </div>
              <div className="text-xs text-danger-foreground/70">Critical Cases</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}