import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { PlantHealthCard } from "@/components/dashboard/PlantHealthCard";
import { ControlPanel } from "@/components/dashboard/ControlPanel";
import { SensorData } from "@/components/dashboard/SensorData";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { FieldMap } from "@/components/dashboard/FieldMap";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import agvRobotImage from "@/assets/agv-robot.jpg";

const individualPlantData = [
  {
    plantId: "P001",
    plantType: "Tomato",
    status: "healthy" as const,
    confidenceLevel: 98,
    recommendedDosage: 0,
    location: { row: 1, column: 3 },
    lastScan: "2 minutes ago"
  },
  {
    plantId: "P027", 
    plantType: "Corn",
    status: "pest_detected" as const,
    infectionType: "Aphid infestation detected",
    confidenceLevel: 87,
    recommendedDosage: 15,
    location: { row: 3, column: 8 },
    lastScan: "3 minutes ago"
  },
  {
    plantId: "P045",
    plantType: "Wheat",
    status: "disease_detected" as const,
    infectionType: "Early blight symptoms",
    confidenceLevel: 92,
    recommendedDosage: 22,
    location: { row: 5, column: 12 },
    lastScan: "5 minutes ago"
  },
  {
    plantId: "P063",
    plantType: "Soybean", 
    status: "critical" as const,
    infectionType: "Severe fungal infection",
    confidenceLevel: 95,
    recommendedDosage: 35,
    location: { row: 7, column: 15 },
    lastScan: "1 minute ago"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Individual Plant Health Monitoring */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold">
                Individual Plant Health Monitoring
              </h2>
              <div className="flex-1 relative">
                <img 
                  src={agvRobotImage} 
                  alt="AGV robot monitoring individual plants"
                  className="h-16 w-24 object-cover rounded-lg shadow-card ml-auto"
                />
                <div className="absolute -bottom-1 -right-1 bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
                  AGV Scanning
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {individualPlantData.map((data, index) => (
                <PlantHealthCard key={index} data={data} />
              ))}
            </div>
            
            {/* Field Map */}
            <FieldMap />
          </div>

          {/* Control & Monitoring Panel */}
          <div className="lg:col-span-4 space-y-6">
            <ControlPanel />
            <SensorData />
            <AlertsPanel />
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Individual Plant Analytics & Environmental Impact</h2>
          <AnalyticsChart />
        </div>
      </main>
    </div>
  );
};

export default Index;
