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
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/hooks/use-app-context';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import type { Scan } from '@/lib/types';

const statusStyles: Record<string, string> = {
  Completed: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
  Flagged: "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100",
  Pending: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100",
  Failed: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
};


const ScansPage = () => {
  const { scans } = useAppContext();

  const getPatientInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Scan History</h1>
        <p className="text-muted-foreground mt-1">Review all ultrasound scans performed at your clinic</p>
      </div>
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="pl-6 uppercase tracking-wider font-medium text-muted-foreground text-xs">Patient Name</TableHead>
                <TableHead className="uppercase tracking-wider font-medium text-muted-foreground text-xs">Scan Type</TableHead>
                <TableHead className="uppercase tracking-wider font-medium text-muted-foreground text-xs">Date & Time</TableHead>
                <TableHead className="uppercase tracking-wider font-medium text-muted-foreground text-xs text-center">Credits Used</TableHead>
                <TableHead className="uppercase tracking-wider font-medium text-muted-foreground text-xs">Status</TableHead>
                <TableHead className="pr-6 uppercase tracking-wider font-medium text-muted-foreground text-xs text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scans.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((scan) => (
                <TableRow key={scan.id}>
                  <TableCell className="font-medium pl-6 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                              {getPatientInitials(scan.patientName)}
                          </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{scan.patientName}</p>
                        <p className="text-xs text-muted-foreground">PID-{scan.patientId.replace('p', '')}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">{scan.bodyPart}</TableCell>
                  <TableCell className="py-3">{format(new Date(scan.date), 'MMM d, yyyy • HH:mm')}</TableCell>
                  <TableCell className="text-center py-3">{scan.creditsUsed}</TableCell>
                  <TableCell className="py-3">
                    <Badge variant="outline" className={cn("font-semibold", statusStyles[scan.status] || statusStyles['Pending'])}>
                      {scan.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6 py-3">
                    <Button variant="link" size="sm" className="p-0 h-auto font-semibold hover:no-underline text-primary">
                      {scan.status === 'Flagged' ? 'Review' : 'View Report'}
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
