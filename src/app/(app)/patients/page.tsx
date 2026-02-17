'use client';

import React, { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Eye, User, Cake, Phone, MapPin, Venus, Mars, Users, Scan as ScanIcon, Printer, Download } from 'lucide-react';
import { useAppContext } from '@/hooks/use-app-context';
import type { Patient, Scan } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const PatientsPage = () => {
  const { patients, scans } = useAppContext();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(patients[0] || null);
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();


  const selectedPatientScans = useMemo(() => {
    if (!selectedPatient) return [];
    return scans.filter((scan) => scan.patientId === selectedPatient.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedPatient, scans]);

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
  };
  
  const handleViewReport = (scan: Scan) => {
    setSelectedScan(scan);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!selectedScan?.imageUrl) return;
    const link = document.createElement('a');
    link.href = selectedScan.imageUrl;
    link.download = `scan-report-${selectedScan.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
        title: "Download Started",
        description: `Downloading report for scan ${selectedScan.id}.`,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <Card className="lg:col-span-1">
              <CardHeader>
                  <CardTitle>Patient List</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                  <Table>
                      <TableHeader>
                        <TableRow>
                            <TableHead>Patient</TableHead>
                            <TableHead className="text-right">Scans</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                      {patients.map((patient) => (
                          <TableRow 
                              key={patient.id} 
                              className={`cursor-pointer transition-colors ${selectedPatient?.id === patient.id ? "bg-accent hover:bg-accent/80" : "hover:bg-accent/50"}`}
                              onClick={() => handleViewPatient(patient)}
                          >
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9">
                                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                                          {patient.name.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                  </Avatar>
                                  <span>{patient.name}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                  <Badge variant="outline">{patient.totalScans}</Badge>
                              </TableCell>
                          </TableRow>
                      ))}
                      </TableBody>
                  </Table>
              </CardContent>
          </Card>

          <div className="lg:col-span-2">
            {selectedPatient ? (
              <Card className="shadow-lg border-2">
                  <CardHeader className="flex flex-row items-center gap-6 p-6 bg-muted/20">
                      <Avatar className="h-24 w-24 border-4 border-primary">
                          <AvatarFallback className="text-4xl bg-primary/10 text-primary font-bold">
                              {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                          <CardTitle className="text-3xl">{selectedPatient.name}</CardTitle>
                          <CardDescription className="text-md">Patient ID: {selectedPatient.id} &bull; Last Scan: {selectedPatient.lastScan || 'N/A'}</CardDescription>
                      </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                      <div>
                          <h3 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2"><User size={20} /> Personal Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                              <div className="flex items-start gap-3">
                                  <Cake size={18} className="text-muted-foreground mt-1" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Age</p>
                                    <p className="font-semibold">{selectedPatient.age} years</p>
                                  </div>
                              </div>
                              <div className="flex items-start gap-3">
                                  {selectedPatient.gender === 'Female' ? <Venus size={18} className="text-muted-foreground mt-1" /> : <Mars size={18} className="text-muted-foreground mt-1" />}
                                  <div>
                                    <p className="text-sm text-muted-foreground">Gender</p>
                                    <p className="font-semibold">{selectedPatient.gender}</p>
                                  </div>
                              </div>
                              <div className="flex items-start gap-3">
                                  <Phone size={18} className="text-muted-foreground mt-1" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <p className="font-semibold">{selectedPatient.phone}</p>
                                  </div>
                              </div>
                              <div className="flex items-start gap-3">
                                  <MapPin size={18} className="text-muted-foreground mt-1" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Address</p>
                                    <p className="font-semibold">{selectedPatient.address}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      
                      <div>
                          <h3 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2"><ScanIcon size={20} /> Scan History</h3>
                          {selectedPatientScans.length > 0 ? (
                              <Table>
                                  <TableHeader>
                                      <TableRow>
                                          <TableHead>Date</TableHead>
                                          <TableHead>Body Part</TableHead>
                                          <TableHead>Status</TableHead>
                                          <TableHead className="text-right">View Report</TableHead>
                                      </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                  {selectedPatientScans.map((scan) => (
                                      <TableRow key={scan.id}>
                                      <TableCell>{scan.date}</TableCell>
                                      <TableCell>{scan.bodyPart}</TableCell>
                                      <TableCell>
                                          <Badge variant={scan.status === 'Completed' ? 'default' : 'secondary'}>{scan.status}</Badge>
                                      </TableCell>
                                      <TableCell className="text-right">
                                          <Button variant="outline" size="sm" onClick={() => handleViewReport(scan)}><Eye className="h-4 w-4 mr-2" /> View</Button>
                                      </TableCell>
                                      </TableRow>
                                  ))}
                                  </TableBody>
                              </Table>
                          ) : (
                              <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                                  <p className="font-medium">No scan history found.</p>
                                  <p className="text-sm">Perform a new scan for this patient.</p>
                              </div>
                          )}
                      </div>
                  </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col items-center justify-center h-full rounded-lg border-2 border-dashed border-gray-300 min-h-[500px]">
                  <Users className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">No Patient Selected</h3>
                  <p className="text-muted-foreground text-sm">Please select a patient from the list to view their details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Dialog open={!!selectedScan} onOpenChange={(isOpen) => !isOpen && setSelectedScan(null)}>
        <DialogContent className="sm:max-w-3xl printable-area">
          <div ref={reportRef} className="printable-content">
            <DialogHeader>
              <DialogTitle>Scan Report</DialogTitle>
              <CardDescription>Scan ID: {selectedScan?.id}</CardDescription>
            </DialogHeader>
            <div className="my-4">
              <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                <div>
                  <p className="font-semibold">Patient Name</p>
                  <p className="text-muted-foreground">{selectedPatient?.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Age</p>
                  <p className="text-muted-foreground">{selectedPatient?.age}</p>
                </div>
                <div>
                  <p className="font-semibold">Gender</p>
                  <p className="text-muted-foreground">{selectedPatient?.gender}</p>
                </div>
              </div>

              {selectedScan?.imageUrl && (
                <div className="rounded-lg overflow-hidden border">
                  <Image
                    src={selectedScan.imageUrl}
                    alt={`Scan for ${selectedScan.bodyPart}`}
                    width={800}
                    height={600}
                    className="object-cover w-full"
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="print:hidden">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <style jsx global>{`
        @media print {
          body > *:not(.printable-area) {
            display: none;
          }
          .printable-area {
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            padding: 2rem;
            background: white;
            border: none;
            box-shadow: none;
          }
          .printable-content {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default PatientsPage;
