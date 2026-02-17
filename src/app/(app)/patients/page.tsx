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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, PlusCircle } from 'lucide-react';
import { useAppContext } from '@/hooks/use-app-context';
import type { Patient, Scan } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

const AddPatientForm = ({ onPatientAdded }: { onPatientAdded: () => void }) => {
  const { addPatient } = useAppContext();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !gender) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all fields.",
      });
      return;
    }
    addPatient({ name, age: parseInt(age), gender });
    toast({
      title: "Success",
      description: "New patient has been added.",
    });
    setName('');
    setAge('');
    setGender('');
    onPatientAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Patient Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 42" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select onValueChange={(value: any) => setGender(value)} value={gender}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save Patient</Button>
      </DialogFooter>
    </form>
  );
};

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <AddPatientForm onPatientAdded={() => setIsModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
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
            <PatientHistory patient={selectedPatient} scans={selectedPatientScans} />
          ) : (
            <div className="flex items-center justify-center h-full rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-muted-foreground">Select a patient to view their history</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;
