'use client';

import { useState, useEffect } from 'react';
import { Bike, Car, Clock, TrendingUp } from 'lucide-react';
import { AppLayout } from '@/components/app-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnalyticsChart } from '@/components/analytics-chart';
import type { ChartConfig } from '@/components/ui/chart';

const initialAnalyticsData = {
  "7": [
    { date: "Mon", twoWheelers: 45, fourWheelers: 18 },
    { date: "Tue", twoWheelers: 48, fourWheelers: 19 },
    { date: "Wed", twoWheelers: 40, fourWheelers: 15 },
    { date: "Thu", twoWheelers: 50, fourWheelers: 20 },
    { date: "Fri", twoWheelers: 42, fourWheelers: 17 },
    { date: "Sat", twoWheelers: 35, fourWheelers: 12 },
    { date: "Sun", twoWheelers: 38, fourWheelers: 14 },
  ],
  "15": [],
  "30": [],
};

const chartConfig = {
  twoWheelers: {
    label: "2-Wheelers",
    color: "hsl(var(--chart-1))",
  },
  fourWheelers: {
    label: "4-Wheelers",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<"7" | "15" | "30">("7");
  const [analyticsData, setAnalyticsData] = useState(initialAnalyticsData);

  useEffect(() => {
    // Generate random data on the client side to avoid hydration mismatch
    const generateData = (days: number) => 
      Array.from({ length: days }, (_, i) => ({ 
        date: `Day ${i + 1}`, 
        twoWheelers: Math.floor(Math.random() * 20) + 30, 
        fourWheelers: Math.floor(Math.random() * 10) + 10 
      }));

    setAnalyticsData(prevData => ({
      ...prevData,
      "15": generateData(15),
      "30": generateData(30),
    }));
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
          <p className="text-muted-foreground">Key performance indicators for your parking space.</p>
        </div>
        
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold font-headline">Performance Overview</h2>
            <Select value={timeRange} onValueChange={(value: "7" | "15" | "30") => setTimeRange(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="15">Last 15 Days</SelectItem>
                <SelectItem value="30">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Check-ins</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+15% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5 PM - 7 PM</div>
                <p className="text-xs text-muted-foreground">Most vehicle check-ins</p>
              </CardContent>
            </Card>
              <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. 2W Parking</CardTitle>
                <Bike className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.5 Hours</div>
                <p className="text-xs text-muted-foreground">Average duration</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. 4W Parking</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2 Hours</div>
                <p className="text-xs text-muted-foreground">Average duration</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Trend</CardTitle>
              <CardDescription>Daily vehicle count over the selected period.</CardDescription>
            </CardHeader>
            <CardContent>
              <AnalyticsChart 
                  data={analyticsData[timeRange]} 
                  chartConfig={chartConfig} 
                  dataKeys={[{key: 'twoWheelers', color: 'twoWheelers'}, {key: 'fourWheelers', color: 'fourWheelers'}]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
