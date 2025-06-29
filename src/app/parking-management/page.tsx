'use client';

import { AppLayout } from '@/components/app-layout';
import { ParkingDetailsForm } from '@/components/parking-details-form';
import { useToast } from '@/hooks/use-toast';
import type { z } from 'zod';
import type { parkingDetailsSchema } from '@/lib/schemas';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type ParkingDetailsFormValues = z.infer<typeof parkingDetailsSchema>;

const mockHistory = [
  { id: 1, date: '2024-07-20', editor: 'Admin', change: 'Updated closing time to 23:00.' },
  { id: 2, date: '2024-07-15', editor: 'Manager', change: 'Added "EV Charging" to amenities.' },
  { id: 3, date: '2024-06-30', editor: 'Admin', change: 'Updated Google Maps link.' },
  { id: 4, date: '2024-06-01', editor: 'Admin', change: 'Initial details submitted.' },
];

const mockDefaultValues = {
    name: 'City Center Parking',
    location: '123 Main St, Kathmandu, Nepal',
    openingTime: '08:00',
    closingTime: '23:00',
    googleMapsLink: 'https://maps.app.goo.gl/example',
    facilities: 'CCTV Surveillance, 24/7 Security Guards, Covered Parking, Fire Safety',
    amenities: 'Public Restroom, Car Wash Service, EV Charging Station, Waiting Lounge',
};

export default function ParkingManagementPage() {
  const { toast } = useToast();

  const handleSaveChanges = (data: ParkingDetailsFormValues) => {
    console.log('Saving changes:', data);
    toast({
      title: 'Settings Saved!',
      description: 'Your parking space details have been updated successfully.',
    });
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Parking Management</h1>
          <p className="text-muted-foreground">
            Edit your parking space details and view change history.
          </p>
        </div>
        
        <Tabs defaultValue="details" className="max-w-4xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Parking Details</TabsTrigger>
            <TabsTrigger value="history">Update History</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6">
            <ParkingDetailsForm
              onSubmit={handleSaveChanges}
              defaultValues={mockDefaultValues}
              buttonText="Save Changes"
            />
          </TabsContent>
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Change History</CardTitle>
                <CardDescription>A log of recent updates made to the parking space details.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Editor</TableHead>
                      <TableHead>Change Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockHistory.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.date}</TableCell>
                        <TableCell>{entry.editor}</TableCell>
                        <TableCell>{entry.change}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
