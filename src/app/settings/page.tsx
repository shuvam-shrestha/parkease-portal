'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { AppLayout } from '@/components/app-layout';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { userProfileSchema } from '@/lib/schemas';

type UserProfileFormValues = z.infer<typeof userProfileSchema>;

export default function SettingsPage() {
  const { toast } = useToast();

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: 'Parking Manager',
      email: 'owner@example.com',
    },
  });

  const handleSaveChanges = (data: UserProfileFormValues) => {
    console.log('Saving profile changes:', data);
    toast({
      title: 'Profile Updated!',
      description: 'Your profile details have been saved.',
    });
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and profile settings.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-1 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSaveChanges)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
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
                            <Input placeholder="your@email.com" {...field} readOnly disabled />
                          </FormControl>
                          <FormDescription>
                            Your email address cannot be changed.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <Button type="submit">Save Changes</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-muted-foreground text-sm">For security, you can change your password.</p>
                        <Button variant="outline">Change Password</Button>
                    </div>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </AppLayout>
  );
}
