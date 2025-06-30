'use client';

import { useState, useMemo, useEffect } from 'react';
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
import { Input } from '@/components/ui/input';

const TWO_WHEELER_CAPACITY = 50;
const FOUR_WHEELER_CAPACITY = 20;

type VehicleLogEntry = {
  id: string;
  vehicleNumber: string;
  vehicleType: '2w' | '4w';
  status: 'Checked In' | 'Checked Out';
  timestamp: Date;
  checkOutTimestamp?: Date;
};

const getInitialVehicleLog = (): VehicleLogEntry[] => [
    { id: 'V1', vehicleNumber: 'BA 99 PA 1234', vehicleType: '2w', status: 'Checked In', timestamp: new Date(new Date().setHours(new Date().getHours() - 25)) },
    { id: 'V2', vehicleNumber: 'KA 01 MA 5678', vehicleType: '4w', status: 'Checked In', timestamp: new Date(new Date().setHours(new Date().getHours() - 26)) },
    { id: 'V3', vehicleNumber: 'GA 12 SA 4321', vehicleType: '2w', status: 'Checked Out', timestamp: new Date(new Date().setHours(new Date().getHours() - 5)), checkOutTimestamp: new Date(new Date().setHours(new Date().getHours() - 2)) },
    { id: 'V4', vehicleNumber: 'BA 98 PA 5555', vehicleType: '2w', status: 'Checked In', timestamp: new Date(new Date().setHours(new Date().getHours() - 3)) },
    { id: 'V5', vehicleNumber: 'PR 01 CA 9999', vehicleType: '4w', status: 'Checked Out', timestamp: new Date(new Date().setHours(new Date().getHours() - 8)), checkOutTimestamp: new Date(new Date().setHours(new Date().getHours() - 4)) },
    { id: 'V6', vehicleNumber: 'BA 99 PA 1111', vehicleType: '2w', status: 'Checked In', timestamp: new Date(new Date().setHours(new Date().getHours() - 49)) },
    { id: 'V7', vehicleNumber: 'LU 01 TA 7777', vehicleType: '4w', status: 'Checked In', timestamp: new Date(new Date().setHours(new Date().getHours() - 73)) },
];


export default function VehicleManagementPage() {
  const { toast } = useToast();
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleLog, setVehicleLog] = useState<VehicleLogEntry[]>([]);
  
  const [filterDate, setFilterDate] = useState<Date | undefined>();
  const [filterVehicleType, setFilterVehicleType] = useState<'all' | '2w' | '4w'>('all');
  
  useEffect(() => {
    setVehicleLog(getInitialVehicleLog());
  }, []);

  const twoWheelerSlots = useMemo(() => 
    vehicleLog.filter(v => v.vehicleType === '2w' && v.status === 'Checked In').length, 
    [vehicleLog]
  );
  const fourWheelerSlots = useMemo(() => 
    vehicleLog.filter(v => v.vehicleType === '4w' && v.status === 'Checked In').length,
    [vehicleLog]
  );

  const handleCheckIn = (type: '2w' | '4w') => {
    const capacity = type === '2w' ? TWO_WHEELER_CAPACITY : FOUR_WHEELER_CAPACITY;
    const currentSlots = type === '2w' ? twoWheelerSlots : fourWheelerSlots;
    
    if (currentSlots >= capacity) {
      toast({ variant: 'destructive', title: 'Error', description: `No available slots for ${type === '2w' ? 'two-wheelers' : 'four-wheelers'}.` });
      return;
    }
    
    const newEntry: VehicleLogEntry = {
      id: new Date().toISOString(),
      vehicleNumber: vehicleNumber.toUpperCase(),
      vehicleType: type,
      status: 'Checked In' as const,
      timestamp: new Date(),
    };

    setVehicleLog(prevLog => [newEntry, ...prevLog]);
    setVehicleNumber('');
    toast({ title: 'Success', description: `${type === '2w' ? '2-wheeler' : '4-wheeler'} checked in.` });
  };

  const handleCheckOut = (type: '2w' | '4w') => {
    const vehicleInLog = vehicleLog.find(v => v.vehicleNumber === vehicleNumber.toUpperCase() && v.status === 'Checked In');

    if (!vehicleInLog) {
      toast({ variant: 'destructive', title: 'Error', description: 'Vehicle not found or already checked out.' });
      return;
    }
    
    setVehicleLog(prevLog => 
      prevLog.map(v => 
        v.id === vehicleInLog.id 
          ? { ...v, status: 'Checked Out' as const, checkOutTimestamp: new Date() }
          : v
      )
    );

    setVehicleNumber('');
    toast({ title: 'Success', description: `${type === '2w' ? '2-wheeler' : '4-wheeler'} checked out.` });
  };

  const filteredLog = useMemo(() => {
    return vehicleLog.filter(entry => {
      const dateMatch = !filterDate || format(entry.timestamp, 'yyyy-MM-dd') === format(filterDate, 'yyyy-MM-dd') || (entry.checkOutTimestamp && format(entry.checkOutTimestamp, 'yyyy-MM-dd') === format(filterDate, 'yyyy-MM-dd'));
      const typeMatch = filterVehicleType === 'all' || entry.vehicleType === filterVehicleType;
      return dateMatch && typeMatch;
    });
  }, [vehicleLog, filterDate, filterVehicleType]);

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Vehicle Management</h1>
          <p className="text-muted-foreground">Real-time vehicle check-in and check-out.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Entry</CardTitle>
            <CardDescription>Enter a vehicle number below to enable check-in or check-out actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input 
              placeholder="e.g. BA 99 PA 1234" 
              value={vehicleNumber} 
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              className="max-w-sm text-lg"
            />
          </CardContent>
        </Card>

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
              <Button size="lg" onClick={() => handleCheckIn('2w')} disabled={!vehicleNumber}>
                <LogIn className="mr-2 h-5 w-5" /> Check In
              </Button>
              <Button size="lg" variant="outline" onClick={() => handleCheckOut('2w')} disabled={!vehicleNumber}>
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
              <Button size="lg" onClick={() => handleCheckIn('4w')} disabled={!vehicleNumber}>
                <LogIn className="mr-2 h-5 w-5" /> Check In
              </Button>
              <Button size="lg" variant="outline" onClick={() => handleCheckOut('4w')} disabled={!vehicleNumber}>
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
                            <TableHead>Check-in Time</TableHead>
                            <TableHead>Check-out Time</TableHead>
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
                                    <TableCell>{format(entry.timestamp, 'PPp')}</TableCell>
                                    <TableCell>{entry.checkOutTimestamp ? format(entry.checkOutTimestamp, 'PPp') : 'N/A'}</TableCell>
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
