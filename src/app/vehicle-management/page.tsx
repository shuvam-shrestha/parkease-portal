
'use client';

import { useState, useMemo } from 'react';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const TWO_WHEELER_CAPACITY = 50;
const FOUR_WHEELER_CAPACITY = 20;

const mockVehicleLog: {
  id: string;
  vehicleNumber: string;
  vehicleType: '2w' | '4w';
  status: 'Checked In' | 'Checked Out';
  timestamp: Date;
}[] = [
    { id: 'V1', vehicleNumber: 'BA 99 PA 1234', vehicleType: '2w', status: 'Checked In', timestamp: new Date(new Date().setDate(new Date().getDate() - 1)) },
    { id: 'V2', vehicleNumber: 'KA 01 MA 5678', vehicleType: '4w', status: 'Checked In', timestamp: new Date(new Date().setDate(new Date().getDate() - 1)) },
    { id: 'V3', vehicleNumber: 'GA 12 SA 4321', vehicleType: '2w', status: 'Checked Out', timestamp: new Date() },
    { id: 'V4', vehicleNumber: 'BA 98 PA 5555', vehicleType: '2w', status: 'Checked In', timestamp: new Date() },
    { id: 'V5', vehicleNumber: 'PR 01 CA 9999', vehicleType: '4w', status: 'Checked Out', timestamp: new Date() },
    { id: 'V6', vehicleNumber: 'BA 99 PA 1111', vehicleType: '2w', status: 'Checked In', timestamp: new Date(new Date().setDate(new Date().getDate() - 2)) },
    { id: 'V7', vehicleNumber: 'LU 01 TA 7777', vehicleType: '4w', status: 'Checked In', timestamp: new Date(new Date().setDate(new Date().getDate() - 3)) },
];


export default function VehicleManagementPage() {
  const { toast } = useToast();
  const [twoWheelerSlots, setTwoWheelerSlots] = useState(12);
  const [fourWheelerSlots, setFourWheelerSlots] = useState(5);
  
  const [filterDate, setFilterDate] = useState<Date | undefined>();
  const [filterVehicleType, setFilterVehicleType] = useState<'all' | '2w' | '4w'>('all');

  const handleCheckIn = (type: '2w' | '4w') => {
    if (type === '2w') {
      if (twoWheelerSlots < TWO_WHEELER_CAPACITY) {
        setTwoWheelerSlots(prev => prev + 1);
        toast({ title: 'Success', description: '2-wheeler checked in.' });
      } else {
        toast({ variant: 'destructive', title: 'Error', description: 'No available slots for two-wheelers.' });
      }
    } else {
      if (fourWheelerSlots < FOUR_WHEELER_CAPACITY) {
        setFourWheelerSlots(prev => prev + 1);
        toast({ title: 'Success', description: '4-wheeler checked in.' });
      } else {
        toast({ variant: 'destructive', title: 'Error', description: 'No available slots for four-wheelers.' });
      }
    }
  };

  const handleCheckOut = (type: '2w' | '4w') => {
    if (type === '2w' && twoWheelerSlots > 0) {
      setTwoWheelerSlots(prev => prev - 1);
       toast({ title: 'Success', description: '2-wheeler checked out.' });
    } else if (type === '4w' && fourWheelerSlots > 0) {
      setFourWheelerSlots(prev => prev - 1);
       toast({ title: 'Success', description: '4-wheeler checked out.' });
    }
  };

  const filteredLog = useMemo(() => {
    return mockVehicleLog.filter(entry => {
      const dateMatch = !filterDate || format(entry.timestamp, 'yyyy-MM-dd') === format(filterDate, 'yyyy-MM-dd');
      const typeMatch = filterVehicleType === 'all' || entry.vehicleType === filterVehicleType;
      return dateMatch && typeMatch;
    });
  }, [filterDate, filterVehicleType]);

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

        <Card>
            <CardHeader>
                <CardTitle>Vehicle Activity Log</CardTitle>
                <CardDescription>A log of all vehicle check-ins and check-outs.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <DatePicker date={filterDate} setDate={setFilterDate} />
                    <Select value={filterVehicleType} onValueChange={(value: 'all' | '2w' | '4w') => setFilterVehicleType(value)}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Vehicles</SelectItem>
                        <SelectItem value="2w">2-Wheelers</SelectItem>
                        <SelectItem value="4w">4-Wheelers</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => { setFilterDate(undefined); setFilterVehicleType('all'); }}>Clear Filters</Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Vehicle No.</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredLog.length > 0 ? (
                            filteredLog.map((entry) => (
                                <TableRow key={entry.id}>
                                    <TableCell className="font-medium">{entry.vehicleNumber}</TableCell>
                                    <TableCell>{entry.vehicleType === '2w' ? '2-Wheeler' : '4-Wheeler'}</TableCell>
                                    <TableCell>
                                        <Badge variant={entry.status === 'Checked In' ? 'default' : 'secondary'}>
                                            {entry.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{format(entry.timestamp, 'PPP')}</TableCell>
                                    <TableCell>{format(entry.timestamp, 'p')}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">No logs found for the selected filters.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
