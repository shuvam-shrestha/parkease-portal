'use client';

import { AppLayout } from '@/components/app-layout';
import { ParkingDetailsForm } from '@/components/parking-details-form';
import { useToast } from '@/hooks/use-toast';
import type { z } from 'zod';
import type { parkingDetailsSchema } from '@/lib/schemas';

type ParkingDetailsFormValues = z.infer<typeof parkingDetailsSchema>;

export default function SettingsPage() {
  const { toast } = useToast();

  const handleSaveChanges = (data: ParkingDetailsFormValues) => {
    console.log('Saving changes:', data);
    toast({
      title: 'Settings Saved!',
      description: 'Your parking space details have been updated successfully.',
    });
  };

  const mockDefaultValues = {
    name: 'City Center Parking',
    location: '123 Main St, Kathmandu, Nepal',
    openingTime: '08:00',
    closingTime: '22:00',
    googleMapsLink: 'https://maps.app.goo.gl/example',
    facilities: 'CCTV Surveillance, 24/7 Security Guards, Covered Parking, Fire Safety',
    amenities: 'Public Restroom, Car Wash Service, EV Charging Station, Waiting Lounge',
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Parking Space Settings</h1>
          <p className="text-muted-foreground">
            Update the details of your parking space. Changes will be reflected for all users.
          </p>
        </div>
        <div className="max-w-4xl">
          <ParkingDetailsForm
            onSubmit={handleSaveChanges}
            defaultValues={mockDefaultValues}
            buttonText="Save Changes"
          />
        </div>
      </div>
    </AppLayout>
  );
}
