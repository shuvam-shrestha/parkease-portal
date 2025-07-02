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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

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

const mockPaylogs = [
    { id: 'TXN12345', date: '2024-07-21', method: 'Esewa', amount: 'NPR 150', status: 'Completed' },
    { id: 'TXN12346', date: '2024-07-21', method: 'Khalti', amount: 'NPR 200', status: 'Completed' },
    { id: 'TXN12347', date: '2024-07-21', method: 'Cash', amount: 'NPR 100', status: 'Completed' },
    { id: 'TXN12348', date: '2024-07-20', method: 'Fonepay', amount: 'NPR 500', status: 'Completed' },
    { id: 'TXN12349', date: '2024-07-20', method: 'IME Pay', amount: 'NPR 50', status: 'Pending' },
    { id: 'TXN12350', date: '2024-07-19', method: 'Esewa', amount: 'NPR 300', status: 'Failed' },
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
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
            {paymentMethods.map((method) => (
              <TabsTrigger key={method.value} value={method.value}>
                {method.name}
              </TabsTrigger>
            ))}
            <TabsTrigger value="cash">Cash</TabsTrigger>
            <TabsTrigger value="paylogs">Paylogs</TabsTrigger>
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

          <TabsContent value="paylogs" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Payment Logs</CardTitle>
                    <CardDescription>A log of all recent transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockPaylogs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-medium">{log.id}</TableCell>
                                    <TableCell>{log.date}</TableCell>
                                    <TableCell>{log.method}</TableCell>
                                    <TableCell>{log.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={log.status === 'Completed' ? 'secondary' : log.status === 'Failed' ? 'destructive' : 'default'}>
                                            {log.status}
                                        </Badge>
                                    </TableCell>
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
