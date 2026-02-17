'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useAppContext } from '@/hooks/use-app-context';

const ScansPage = () => {
  const { scans } = useAppContext();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Scan History</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Body Part</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Credits Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scans.map((scan) => (
                <TableRow key={scan.id}>
                  <TableCell className="font-medium">{scan.patientName}</TableCell>
                  <TableCell>{scan.bodyPart}</TableCell>
                  <TableCell>{scan.date}</TableCell>
                  <TableCell>{scan.creditsUsed}</TableCell>
                  <TableCell>
                    <Badge variant={scan.status === 'Completed' ? 'default' : 'secondary'}>
                      {scan.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScansPage;
