"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  BarChart2,
  Package,
  AlertTriangle,
} from "lucide-react";

export default function DashboardHome() {
  const [itemsInspected, setItemsInspected] = useState(1000);
  const [defectsDetected, setDefectsDetected] = useState(50);
  const [recentAlerts, setRecentAlerts] = useState([
    {
      id: 1,
      message: "High defect rate detected in Batch A-123",
      severity: "high",
    },
    {
      id: 2,
      message: "Inspection camera 2 requires calibration",
      severity: "medium",
    },
    { id: 3, message: "Daily inspection quota reached", severity: "low" },
  ]);
  interface RealTimeData {
    timestamp: string;
    event: string;
    status: string;
  }

  const [realTimeData, setRealTimeData] = useState<RealTimeData[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setItemsInspected((prev) => prev + Math.floor(Math.random() * 10));
      setDefectsDetected((prev) => prev + Math.floor(Math.random() * 2));

      setRealTimeData((prev) => [
        {
          timestamp: new Date().toLocaleTimeString(),
          event: `Inspected item ${itemsInspected + 1}`,
          status: Math.random() > 0.1 ? "Pass" : "Fail",
        },
        ...prev.slice(0, 4),
      ]);
    }, 3000);

    return () => clearInterval(timer);
  }, [itemsInspected]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* System Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">System Status</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Operational</div>
          <p className="text-xs text-muted-foreground">
            All systems functioning normally
          </p>
        </CardContent>
      </Card>

      {/* Items Inspected */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Items Inspected</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {itemsInspected.toLocaleString()}
          </div>
          <Progress value={75} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            75% of daily target
          </p>
        </CardContent>
      </Card>

      {/* Defects Detected */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Defects Detected
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{defectsDetected}</div>
          <p className="text-xs text-muted-foreground">5% defect rate</p>
        </CardContent>
      </Card>

      {/* Inspection Accuracy */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Inspection Accuracy
          </CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">99.7%</div>
          <Progress value={99.7} className="mt-2" />
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center gap-2">
                {alert.severity === "high" && (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                {alert.severity === "medium" && (
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                )}
                {alert.severity === "low" && (
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                )}
                <span>{alert.message}</span>
                <Badge
                  variant={
                    alert.severity === "high"
                      ? "destructive"
                      : alert.severity === "medium"
                      ? "default"
                      : "secondary"
                  }
                >
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Data Feed */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Real-time Inspection Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {realTimeData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <span>{item.timestamp}</span>
                <span>{item.event}</span>
                <Badge
                  variant={item.status === "Pass" ? "default" : "destructive"}
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
