'use client';

import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import { useAppContext } from '@/hooks/use-app-context';
import type { Patient, Scan } from '@/lib/types';

const PatientDetails = ({ patient }: { patient: Patient }) => (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Patient Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Name:</span>
          <span className="font-semibold">{patient.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Age:</span>
          <span className="font-semibold">{patient.age}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Gender:</span>
          <span className="font-semibold">{patient.gender}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Phone:</span>
          <span className="font-semibold">{patient.phone}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-muted-foreground">Address:</span>
          <span className="font-semibold text-right max-w-[70%]">{patient.address}</span>
        </div>
      </CardContent>
    </Card>
);

const PatientHistory = ({ patient, scans }: { patient: Patient; scans: Scan[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Scan History for {patient.name}</CardTitle>
    </CardHeader>
    <CardContent>
        {scans.length > 0 ? (
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Body Part</TableHead>
                    <TableHead>Credits Used</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {scans.map((scan) => (
                    <TableRow key={scan.id}>
                    <TableCell>{scan.date}</TableCell>
                    <TableCell>{scan.bodyPart}</TableCell>
                    <TableCell>{scan.creditsUsed}</TableCell>
                    <TableCell>{scan.status}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        ) : (
            <p className="text-muted-foreground text-center">No scan history for this patient.</p>
        )}
    </CardContent>
  </Card>
);

const PatientsPage = () => {
  const { patients, scans } = useAppContext();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const selectedPatientScans = useMemo(() => {
    if (!selectedPatient) return [];
    return scans.filter((scan) => scan.patientId === selectedPatient.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedPatient, scans]);

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card>
            <CardHeader>
                <CardTitle>Patient List</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Total Scans</TableHead>
                        <TableHead>Last Scan</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {patients.map((patient) => (
                        <TableRow key={patient.id} className={selectedPatient?.id === patient.id ? "bg-accent" : ""}>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>{patient.totalScans}</TableCell>
                        <TableCell>{patient.lastScan || 'N/A'}</TableCell>
                        <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => handleViewPatient(patient)}>
                            <Eye className="h-4 w-4" />
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <div>
          {selectedPatient ? (
            <div>
              <PatientDetails patient={selectedPatient} />
              <PatientHistory patient={selectedPatient} scans={selectedPatientScans} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full rounded-lg border-2 border-dashed border-gray-300 min-h-[400px]">
                <p className="text-muted-foreground">Select a patient to view their details and scan history</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;
