'use client';

import { useState } from 'react';
import { Bike, Car, Clock, LogIn, LogOut, TrendingUp, ArrowRight } from 'lucide-react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnalyticsChart } from '@/components/analytics-chart';
import type { ChartConfig } from '@/components/ui/chart';

const TWO_WHEELER_CAPACITY = 50;
const FOUR_WHEELER_CAPACITY = 20;

const analyticsData = {
  "7": [
    { date: "Mon", twoWheelers: 45, fourWheelers: 18 },
    { date: "Tue", twoWheelers: 48, fourWheelers: 19 },
    { date: "Wed", twoWheelers: 40, fourWheelers: 15 },
    { date: "Thu", twoWheelers: 50, fourWheelers: 20 },
    { date: "Fri", twoWheelers: 42, fourWheelers: 17 },
    { date: "Sat", twoWheelers: 35, fourWheelers: 12 },
    { date: "Sun", twoWheelers: 38, fourWheelers: 14 },
  ],
  "15": Array.from({ length: 15 }, (_, i) => ({ date: `Day ${i + 1}`, twoWheelers: Math.floor(Math.random() * 20) + 30, fourWheelers: Math.floor(Math.random() * 10) + 10 })),
  "30": Array.from({ length: 30 }, (_, i) => ({ date: `Day ${i + 1}`, twoWheelers: Math.floor(Math.random() * 25) + 25, fourWheelers: Math.floor(Math.random() * 12) + 8 })),
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
  const { toast } = useToast();
  const [twoWheelerSlots, setTwoWheelerSlots] = useState(12);
  const [fourWheelerSlots, setFourWheelerSlots] = useState(5);
  const [timeRange, setTimeRange] = useState<"7" | "15" | "30">("7");

  const handleCheckIn = (type: '2w' | '4w') => {
    if (type === '2w') {
      if (twoWheelerSlots < TWO_WHEELER_CAPACITY) {
        setTwoWheelerSlots(prev => prev + 1);
      } else {
        toast({ variant: 'destructive', title: 'Error', description: 'No available slots for two-wheelers.' });
      }
    } else {
      if (fourWheelerSlots < FOUR_WHEELER_CAPACITY) {
        setFourWheelerSlots(prev => prev + 1);
      } else {
        toast({ variant: 'destructive', title: 'Error', description: 'No available slots for four-wheelers.' });
      }
    }
  };

  const handleCheckOut = (type: '2w' | '4w') => {
    if (type === '2w' && twoWheelerSlots > 0) {
      setTwoWheelerSlots(prev => prev - 1);
    } else if (type === '4w' && fourWheelerSlots > 0) {
      setFourWheelerSlots(prev => prev - 1);
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
          <p className="text-muted-foreground">Parking analytics and vehicle management.</p>
        </div>

        <Tabs defaultValue="analytics">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="management">Vehicle Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between mt-6">
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

          </TabsContent>

          <TabsContent value="management" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Bike className="h-10 w-10 text-primary" />
                    <div>
                      <CardTitle className="text-2xl font-headline">Two Wheelers</CardTitle>
                      <CardDescription>Available: {TWO_WHEELER_CAPACITY - twoWheelerSlots} / {TWO_WHEELER_CAPACITY}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                   <p className="text-6xl font-bold text-primary">{twoWheelerSlots}</p>
                   <p className="text-sm text-muted-foreground">Occupied Slots</p>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-4">
                  <Button size="lg" onClick={() => handleCheckIn('2w')}>
                    <LogIn className="mr-2" /> Check In
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => handleCheckOut('2w')}>
                    <LogOut className="mr-2" /> Check Out
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Car className="h-10 w-10 text-primary" />
                    <div>
                      <CardTitle className="text-2xl font-headline">Four Wheelers</CardTitle>
                      <CardDescription>Available: {FOUR_WHEELER_CAPACITY - fourWheelerSlots} / {FOUR_WHEELER_CAPACITY}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-6xl font-bold text-primary">{fourWheelerSlots}</p>
                  <p className="text-sm text-muted-foreground">Occupied Slots</p>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-4">
                  <Button size="lg" onClick={() => handleCheckIn('4w')}>
                    <LogIn className="mr-2" /> Check In
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => handleCheckOut('4w')}>
                    <LogOut className="mr-2" /> Check Out
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
