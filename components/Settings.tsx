"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Manager" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Operator" },
];

export default function Settings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [defectThreshold, setDefectThreshold] = useState(5);

  return (
    <Tabs defaultValue="system" className="space-y-4">
      <TabsList>
        <TabsTrigger value="system">System Configuration</TabsTrigger>
        <TabsTrigger value="users">User Management</TabsTrigger>
        <TabsTrigger value="alerts">Alert Settings</TabsTrigger>
        <TabsTrigger value="integration">Integration Setup</TabsTrigger>
      </TabsList>

      <TabsContent value="system">
        <Card>
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>
              Manage your system settings and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" placeholder="Enter company name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" placeholder="Select timezone" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <Input id="date-format" placeholder="Select date format" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="users">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage user accounts and permissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button className="mt-4">Add New User</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="alerts">
        <Card>
          <CardHeader>
            <CardTitle>Alert Settings</CardTitle>
            <CardDescription>
              Configure your notification preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-alerts">Email Alerts</Label>
              <Switch
                id="email-alerts"
                checked={emailAlerts}
                onCheckedChange={setEmailAlerts}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-alerts">SMS Alerts</Label>
              <Switch
                id="sms-alerts"
                checked={smsAlerts}
                onCheckedChange={setSmsAlerts}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defect-threshold">Defect Threshold (%)</Label>
              <Slider
                id="defect-threshold"
                min={1}
                max={10}
                step={1}
                value={[defectThreshold]}
                onValueChange={(value) => setDefectThreshold(value[0])}
              />
              <p className="text-sm text-muted-foreground">
                Current threshold: {defectThreshold}%
              </p>
            </div>
            <Button>Save Alert Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="integration">
        <Card>
          <CardHeader>
            <CardTitle>Integration Setup</CardTitle>
            <CardDescription>
              Configure integrations with other systems.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input id="api-key" type="password" placeholder="Enter API key" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input id="webhook-url" placeholder="Enter webhook URL" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="enable-integration" />
              <Label htmlFor="enable-integration">Enable Integration</Label>
            </div>
            <Button>Save Integration Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
