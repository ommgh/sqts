"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Bell,
  ChevronDown,
  Home,
  Image,
  ListChecks,
  ShipWheel,
  Menu,
  FileText,
} from "lucide-react";
import DashboardHome from "@/components/DashboardHome";
import ImageRecognition from "@/components/ImageRecognition";
import IRCounting from "@/components/IRCounting";
import Reports from "@/components/Reports";
import Settings from "@/components/Settings";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navigateTo = (section: string) => {
    setCurrentSection(section);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="flex items-center gap-2">
            <ListChecks className="h-6 w-6" />
            <span className="text-lg font-semibold">QualityTest</span>
          </div>
        </div>
        <nav className="hidden gap-4 lg:flex">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => navigateTo("home")}
          >
            <Home className="h-5 w-5" />
            Home
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => navigateTo("image-recognition")}
          >
            <Image className="h-5 w-5" />
            Image Recognition
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => navigateTo("ir-counting")}
          >
            <ListChecks className="h-5 w-5" />
            IR Counting
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => navigateTo("reports")}
          >
            <FileText className="h-5 w-5" />
            Reports
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => navigateTo("settings")}
          >
            <ShipWheel className="h-5 w-5" />
            Settings
          </Button>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" className="gap-2">
            <span className="hidden lg:inline-block">John Doe</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <nav className="flex flex-col gap-2 p-4">
              <Button
                variant="ghost"
                className="justify-start gap-2"
                onClick={() => navigateTo("home")}
              >
                <Home className="h-5 w-5" />
                Home
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2"
                onClick={() => navigateTo("image-recognition")}
              >
                <Image className="h-5 w-5" />
                Image Recognition
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2"
                onClick={() => navigateTo("ir-counting")}
              >
                <ListChecks className="h-5 w-5" />
                IR Counting
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2"
                onClick={() => navigateTo("reports")}
              >
                <FileText className="h-5 w-5" />
                Reports
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2"
                onClick={() => navigateTo("settings")}
              >
                <ShipWheel className="h-5 w-5" />
                Settings
              </Button>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-muted/40 p-4 lg:p-6">
          <h1 className="text-2xl font-bold mb-4">
            {currentSection === "home"
              ? "Dashboard"
              : currentSection === "image-recognition"
              ? "Image Recognition"
              : currentSection === "ir-counting"
              ? "IR Counting"
              : currentSection === "reports"
              ? "Reports"
              : "Settings"}
          </h1>
          {currentSection === "home" ? (
            <DashboardHome />
          ) : currentSection === "image-recognition" ? (
            <ImageRecognition />
          ) : currentSection === "ir-counting" ? (
            <IRCounting />
          ) : currentSection === "reports" ? (
            <Reports />
          ) : (
            <Settings />
          )}
        </main>
      </div>
    </div>
  );
}
