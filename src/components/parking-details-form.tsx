'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { parkingDetailsSchema } from '@/lib/schemas';
import { Card, CardContent } from './ui/card';

type ParkingDetailsFormValues = z.infer<typeof parkingDetailsSchema>;

interface ParkingDetailsFormProps {
  onSubmit: (data: ParkingDetailsFormValues) => void;
  defaultValues?: Partial<ParkingDetailsFormValues>;
  buttonText?: string;
}

export function ParkingDetailsForm({
  onSubmit,
  defaultValues,
  buttonText = 'Submit',
}: ParkingDetailsFormProps) {
  const form = useForm<ParkingDetailsFormValues>({
    resolver: zodResolver(parkingDetailsSchema),
    defaultValues: defaultValues || {
      name: '',
      location: '',
      googleMapsLink: '',
      openingTime: '09:00',
      closingTime: '21:00',
      facilities: '',
      amenities: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="space-y-6 pt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parking Space Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. City Center Parking" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 123 Main St, Kathmandu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="openingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opening Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="closingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Closing Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="googleMapsLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Maps Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://maps.app.goo.gl/..." {...field} />
                  </FormControl>
                  <FormDescription>A precise location link helps users find you easily.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facilities</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. CCTV, 24/7 Security, Covered Parking"
                      className="resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>List the main facilities available.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amenities</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Restroom, Car Wash, EV Charging"
                      className="resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>List any extra amenities offered.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" className="w-full" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
              {buttonText}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
