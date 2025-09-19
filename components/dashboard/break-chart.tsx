"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Mon", average: 35, maximum: 55 },
  { name: "Tue", average: 30, maximum: 45 },
  { name: "Wed", average: 40, maximum: 60 },
  { name: "Thu", average: 32, maximum: 50 },
  { name: "Fri", average: 38, maximum: 65 },
  { name: "Sat", average: 25, maximum: 40 },
  { name: "Sun", average: 20, maximum: 30 },
];

const chartConfig = {
  average: {
    label: "Average",
    theme: {
      light: "hsl(var(--chart-4))",
      dark: "hsl(var(--chart-4))",
    },
  },
  maximum: {
    label: "Maximum",
    theme: {
      light: "hsl(var(--chart-5))",
      dark: "hsl(var(--chart-5))",
    },
  },
};

export function BreakChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Break Time Analysis</CardTitle>
        <CardDescription>
          Average and maximum break durations (minutes)
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={chartConfig} className="aspect-[4/3] sm:aspect-[16/9]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="var(--color-average)" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }} 
                name="Average"
              />
              <Line 
                type="monotone" 
                dataKey="maximum" 
                stroke="var(--color-maximum)" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }} 
                name="Maximum"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
