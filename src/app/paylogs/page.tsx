'use client';

import { AppLayout } from '@/components/app-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const mockPaylogs = [
    { id: 'TXN12345', date: '2024-07-21', method: 'Esewa', amount: 'NPR 150', status: 'Completed' },
    { id: 'TXN12346', date: '2024-07-21', method: 'Khalti', amount: 'NPR 200', status: 'Completed' },
    { id: 'TXN12347', date: '2024-07-21', method: 'Cash', amount: 'NPR 100', status: 'Completed' },
    { id: 'TXN12348', date: '2024-07-20', method: 'Fonepay', amount: 'NPR 500', status: 'Completed' },
    { id: 'TXN12349', date: '2024-07-20', method: 'IME Pay', amount: 'NPR 50', status: 'Pending' },
    { id: 'TXN12350', date: '2024-07-19', method: 'Esewa', amount: 'NPR 300', status: 'Failed' },
];

export default function PaylogsPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Payment Logs</h1>
          <p className="text-muted-foreground">
            A history of all recent transactions.
          </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>A log of all recent transactions from all payment methods.</CardDescription>
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
      </div>
    </AppLayout>
  );
}
