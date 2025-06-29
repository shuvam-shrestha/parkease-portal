import { z } from 'zod';

export const parkingDetailsSchema = z.object({
  name: z.string().min(3, { message: 'Parking space name must be at least 3 characters long.' }),
  location: z.string().min(5, { message: 'Location must be at least 5 characters long.' }),
  openingTime: z.string(),
  closingTime: z.string(),
  googleMapsLink: z.string().url({ message: 'Please enter a valid Google Maps URL.' }),
  facilities: z.string().min(10, { message: 'Please list some facilities.' }),
  amenities: z.string().min(10, { message: 'Please list some amenities.' }),
});

export const userProfileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});
