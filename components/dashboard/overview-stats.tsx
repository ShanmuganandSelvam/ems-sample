"use client";

import { 
  Users, 
  Clock, 
  Coffee, 
  AlertTriangle 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OverviewStats() {
  const stats = [
    {
      title: "Total Employees",
      value: "124",
      icon: Users,
      description: "8 new this month",
      trend: "up",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      title: "On-Time Percentage",
      value: "92%",
      icon: Clock,
      description: "↑ 3% from last month",
      trend: "up",
      color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    },
    {
      title: "Avg. Break Time",
      value: "42m",
      icon: Coffee,
      description: "↓ 5m from target",
      trend: "down",
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    },
    {
      title: "System Idle Alerts",
      value: "7",
      icon: AlertTriangle,
      description: "↓ 2 from yesterday",
      trend: "down",
      color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <div className={`rounded-full p-2 ${stat.color}`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
