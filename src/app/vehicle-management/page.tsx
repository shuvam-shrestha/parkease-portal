'use client';

import { useState } from 'react';
import { Bike, Car, LogIn, LogOut } from 'lucide-react';
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

const TWO_WHEELER_CAPACITY = 50;
const FOUR_WHEELER_CAPACITY = 20;

export default function VehicleManagementPage() {
  const { toast } = useToast();
  const [twoWheelerSlots, setTwoWheelerSlots] = useState(12);
  const [fourWheelerSlots, setFourWheelerSlots] = useState(5);

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
          <h1 className="text-3xl font-bold font-headline">Vehicle Management</h1>
          <p className="text-muted-foreground">Real-time vehicle check-in and check-out.</p>
        </div>

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
                <LogIn className="mr-2 h-5 w-5" /> Check In
              </Button>
              <Button size="lg" variant="outline" onClick={() => handleCheckOut('2w')}>
                <LogOut className="mr-2 h-5 w-5" /> Check Out
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
                <LogIn className="mr-2 h-5 w-5" /> Check In
              </Button>
              <Button size="lg" variant="outline" onClick={() => handleCheckOut('4w')}>
                <LogOut className="mr-2 h-5 w-5" /> Check Out
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
