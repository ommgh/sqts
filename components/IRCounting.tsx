"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowRight, ArrowDown, CheckCircle, XCircle } from "lucide-react";

// Mock data for the accuracy chart
const mockAccuracyData = [
  { time: "09:00", accuracy: 98 },
  { time: "10:00", accuracy: 99 },
  { time: "11:00", accuracy: 97 },
  { time: "12:00", accuracy: 98 },
  { time: "13:00", accuracy: 99 },
  { time: "14:00", accuracy: 100 },
  { time: "15:00", accuracy: 98 },
  { time: "16:00", accuracy: 99 },
];

export default function IRCounting() {
  const [totalCount, setTotalCount] = useState(1000);
  const [accuracyRate, setAccuracyRate] = useState(98.5);
  const [recentItems, setRecentItems] = useState<
    { id: number; status: string }[]
  >([]);
  const [accuracyData, setAccuracyData] = useState(mockAccuracyData);

  useEffect(() => {
    const countInterval = setInterval(() => {
      setTotalCount((prevCount) => prevCount + 1);
    }, 2000);

    const itemInterval = setInterval(() => {
      setRecentItems((prevItems) => {
        const newItem = {
          id: Date.now(),
          status: Math.random() > 0.02 ? "success" : "error",
        };
        return [newItem, ...prevItems.slice(0, 9)];
      });
    }, 1000);

    const accuracyInterval = setInterval(() => {
      setAccuracyRate((prevRate) => {
        const newRate = prevRate + (Math.random() - 0.5) * 0.2;
        return Math.min(Math.max(newRate, 97), 100);
      });
      setAccuracyData((prevData) => {
        const newData = [
          ...prevData.slice(1),
          { time: new Date().toLocaleTimeString(), accuracy: accuracyRate },
        ];
        return newData;
      });
    }, 60000);

    return () => {
      clearInterval(countInterval);
      clearInterval(itemInterval);
      clearInterval(accuracyInterval);
    };
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>IR Counting Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-around items-center">
          <div className="text-center">
            <h3 className="text-2xl font-bold">
              {totalCount.toLocaleString()}
            </h3>
            <p className="text-muted-foreground">Total Items Counted</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">{accuracyRate.toFixed(2)}%</h3>
            <p className="text-muted-foreground">Accuracy Rate</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">
              {((totalCount * accuracyRate) / 100).toFixed(0)}
            </h3>
            <p className="text-muted-foreground">Estimated Accurate Count</p>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Count Accuracy Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[95, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live IR Sensor Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentItems.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {index === 0 ? (
                    <ArrowRight className="h-4 w-4 text-blue-500 animate-pulse" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-gray-300" />
                  )}
                  <span>Item {item.id}</span>
                </div>
                <Badge
                  variant={
                    item.status === "success" ? "default" : "destructive"
                  }
                >
                  {item.status === "success" ? (
                    <CheckCircle className="h-4 w-4 mr-1" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-1" />
                  )}
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Hourly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Count Rate</span>
              <span className="font-bold">450 items/hour</span>
            </div>
            <Progress value={75} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0</span>
              <span>300</span>
              <span>600</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
