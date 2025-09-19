"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Mon", onTime: 42, late: 3, absent: 1 },
  { name: "Tue", onTime: 45, late: 2, absent: 0 },
  { name: "Wed", onTime: 40, late: 5, absent: 2 },
  { name: "Thu", onTime: 43, late: 4, absent: 0 },
  { name: "Fri", onTime: 38, late: 6, absent: 3 },
  { name: "Sat", onTime: 20, late: 2, absent: 0 },
  { name: "Sun", onTime: 15, late: 1, absent: 0 },
];

const chartConfig = {
  onTime: {
    label: "On Time",
    theme: {
      light: "hsl(var(--chart-1))",
      dark: "hsl(var(--chart-1))",
    },
  },
  late: {
    label: "Late",
    theme: {
      light: "hsl(var(--chart-2))",
      dark: "hsl(var(--chart-2))",
    },
  },
  absent: {
    label: "Absent",
    theme: {
      light: "hsl(var(--chart-3))",
      dark: "hsl(var(--chart-3))",
    },
  },
};

export function AttendanceChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Weekly Attendance</CardTitle>
        <CardDescription>
          Attendance statistics for the current week
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={chartConfig} className="aspect-[4/3] sm:aspect-[16/9]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="onTime" stackId="a" fill="var(--color-onTime)" name="On Time" />
              <Bar dataKey="late" stackId="a" fill="var(--color-late)" name="Late" />
              <Bar dataKey="absent" stackId="a" fill="var(--color-absent)" name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
