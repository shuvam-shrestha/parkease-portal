
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { signupSchema } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type SignupFormValues = z.infer<typeof signupSchema>;

const SIGNUP_STORAGE_KEY = 'parkease-signup-data';

export default function OnboardingSignupPage() {
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = (data: SignupFormValues) => {
    try {
      if (typeof window !== 'undefined') {
        const signupData = { name: data.name, email: data.email };
        localStorage.setItem(SIGNUP_STORAGE_KEY, JSON.stringify(signupData));
        router.push('/onboarding/details');
      }
    } catch (error) {
      console.error('Failed to save signup data:', error);
      // You could show a toast message here
    }
  };

  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">Step 1: Create Your Account</h1>
        <p className="text-muted-foreground">
          Let's start with your primary details.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Owner Information</CardTitle>
            <CardDescription>Enter your details to create a ParkEase account.</CardDescription>
        </CardHeader>
        <CardContent>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="e.g. owner@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" size="lg" className="w-full" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
                        Next: Parking Details
                    </Button>
                </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  );
}
