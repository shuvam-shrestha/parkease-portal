
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ParkingDetailsForm } from '@/components/parking-details-form';
import type { z } from 'zod';
import type { parkingDetailsSchema } from '@/lib/schemas';

type ParkingDetailsFormValues = z.infer<typeof parkingDetailsSchema>;

const SIGNUP_STORAGE_KEY = 'parkease-signup-data';
const PARKING_DETAILS_STORAGE_KEY = 'parkease-parking-details';

export default function OnboardingDetailsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to signup if the first step wasn't completed
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem(SIGNUP_STORAGE_KEY);
      if (!savedData) {
        router.push('/onboarding/signup');
      }
    }
  }, [router]);

  const handleSubmit = (data: ParkingDetailsFormValues) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(PARKING_DETAILS_STORAGE_KEY, JSON.stringify(data));
        router.push('/onboarding/contract');
      }
    } catch (error) {
      console.error('Failed to save onboarding data:', error);
      // You could show a toast message here
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">Step 2: Tell us about your space</h1>
        <p className="text-muted-foreground">
          Fill in the details below. This information will be used for your listing and contract.
        </p>
      </div>
      <ParkingDetailsForm 
        onSubmit={handleSubmit}
        buttonText="Next: Generate Contract"
      />
    </div>
  );
}
