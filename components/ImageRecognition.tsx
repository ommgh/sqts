"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, AlertTriangle, CheckCircle2 } from "lucide-react";

const mockRecognitionResults = [
  {
    id: 1,
    name: "Product A",
    features: ["Red", "Square", "Large"],
    confidence: 0.95,
  },
  {
    id: 2,
    name: "Product B",
    features: ["Blue", "Round", "Small"],
    confidence: 0.88,
  },
  {
    id: 3,
    name: "Product C",
    features: ["Green", "Triangle", "Medium"],
    confidence: 0.92,
  },
];

const mockOCRResults = [
  { id: 1, text: "LOT: A12345", confidence: 0.98 },
  { id: 2, text: "EXP: 2023-12-31", confidence: 0.96 },
  { id: 3, text: "QTY: 500", confidence: 0.99 },
];

const mockDefects = [
  { id: 1, type: "Scratch", severity: "Low", location: "Top-left" },
  { id: 2, type: "Dent", severity: "Medium", location: "Center" },
  {
    id: 3,
    type: "Color mismatch",
    severity: "High",
    location: "Entire surface",
  },
];

const mockHistoricalData = [
  {
    id: 1,
    date: "2023-05-01",
    productName: "Product A",
    defectsFound: 5,
    totalInspected: 1000,
  },
  {
    id: 2,
    date: "2023-05-02",
    productName: "Product B",
    defectsFound: 3,
    totalInspected: 800,
  },
  {
    id: 3,
    date: "2023-05-03",
    productName: "Product C",
    defectsFound: 7,
    totalInspected: 1200,
  },
  {
    id: 4,
    date: "2023-05-04",
    productName: "Product A",
    defectsFound: 2,
    totalInspected: 900,
  },
  {
    id: 5,
    date: "2023-05-05",
    productName: "Product B",
    defectsFound: 4,
    totalInspected: 1100,
  },
];

export default function ImageRecognition() {
  const [currentImage, setCurrentImage] = useState(
    "https://g-uk5gfikgtsr.vusercontent.net/placeholder.svg?height=400&width=600"
  );
  const [recognitionResults, setRecognitionResults] = useState(
    mockRecognitionResults
  );
  const [ocrResults, setOcrResults] = useState(mockOCRResults);
  const [defects, setDefects] = useState(mockDefects);

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate changing live feed
      setCurrentImage(
        `https://g-uk5gfikgtsr.vusercontent.net/placeholder.svg?height=400&width=600&text=Live Feed ${Date.now()}`
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Live Image Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video">
            <img
              src={currentImage}
              alt="Live feed"
              className="object-cover rounded-md"
            />
            <Badge className="absolute top-2 left-2 bg-red-500 animate-pulse">
              LIVE
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recognition Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Confidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recognitionResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>{result.name}</TableCell>
                  <TableCell>{result.features.join(", ")}</TableCell>
                  <TableCell>{(result.confidence * 100).toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ocr">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ocr">OCR Results</TabsTrigger>
              <TabsTrigger value="defects">Defects</TabsTrigger>
            </TabsList>
            <TabsContent value="ocr">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Detected Text</TableHead>
                    <TableHead>Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ocrResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>{result.text}</TableCell>
                      <TableCell>
                        {(result.confidence * 100).toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="defects">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {defects.map((defect) => (
                    <TableRow key={defect.id}>
                      <TableCell>{defect.type}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            defect.severity === "High"
                              ? "destructive"
                              : defect.severity === "Medium"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {defect.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>{defect.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Historical Data Archive</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="search">Search:</Label>
              <Input
                id="search"
                placeholder="Enter product name..."
                className="w-[250px]"
              />
            </div>
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Defects Found</TableHead>
                <TableHead>Total Inspected</TableHead>
                <TableHead>Defect Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHistoricalData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.defectsFound}</TableCell>
                  <TableCell>{item.totalInspected}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {(
                        (item.defectsFound / item.totalInspected) *
                        100
                      ).toFixed(2)}
                      %
                      {item.defectsFound / item.totalInspected > 0.05 ? (
                        <AlertTriangle className="w-4 h-4 ml-2 text-yellow-500" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 ml-2 text-green-500" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
