'use client';

import Image from 'next/image';
import { AppLayout } from '@/components/app-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Banknote } from 'lucide-react';

const paymentMethods = [
  {
    name: 'Esewa',
    value: 'esewa',
    logo: 'https://placehold.co/120x40.png',
    logoHint: 'esewa logo',
  },
  {
    name: 'Khalti',
    value: 'khalti',
    logo: 'https://placehold.co/120x40.png',
    logoHint: 'khalti logo',
  },
  {
    name: 'Fonepay',
    value: 'fonepay',
    logo: 'https://placehold.co/120x40.png',
    logoHint: 'fonepay logo',
  },
  {
    name: 'IME Pay',
    value: 'imepay',
    logo: 'https://placehold.co/120x40.png',
    logoHint: 'imepay logo',
  },
];

export default function PaymentPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Payment</h1>
          <p className="text-muted-foreground">
            Manage your payment options and view QR codes.
          </p>
        </div>

        <Tabs defaultValue="esewa" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            {paymentMethods.map((method) => (
              <TabsTrigger key={method.value} value={method.value}>
                {method.name}
              </TabsTrigger>
            ))}
            <TabsTrigger value="cash">Cash</TabsTrigger>
          </TabsList>

          {paymentMethods.map((method) => (
            <TabsContent key={method.value} value={method.value} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{method.name} Payment</CardTitle>
                  <CardDescription>
                    Scan the QR code below to make a payment using {method.name}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                  <Image
                    src={method.logo}
                    alt={`${method.name} Logo`}
                    width={120}
                    height={40}
                    data-ai-hint={method.logoHint}
                    className="object-contain"
                  />
                  <div className="p-4 bg-white rounded-lg border">
                    <Image
                      src="https://placehold.co/256x256.png"
                      alt="QR Code"
                      width={256}
                      height={256}
                      data-ai-hint="qr code"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    After scanning, please enter the required amount and confirm the payment. <br />
                    Show the payment confirmation screen to the attendant.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}

          <TabsContent value="cash" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Cash Payment</CardTitle>
                <CardDescription>
                  Instructions for accepting cash payments.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6 text-center">
                 <Banknote className="h-24 w-24 text-primary" />
                 <h2 className="text-2xl font-semibold">Accepting Cash</h2>
                 <p className="text-muted-foreground max-w-md">
                    Please collect the exact amount from the customer. Ensure you have sufficient change available. Record the transaction manually in your logs if necessary.
                 </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
