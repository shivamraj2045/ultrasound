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
  DialogFooter,
} from '@/components/ui/dialog';
import { Eye, User, Cake, Phone, MapPin, Venus, Mars, Users, Scan as ScanIcon, Printer, Download } from 'lucide-react';
import { useAppContext } from '@/hooks/use-app-context';
import type { Patient, Scan } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/icons/Logo';

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
        <DialogContent className="sm:max-w-4xl p-0 printable-area">
          <div ref={reportRef} className="printable-content bg-white p-8 text-black">
            <header className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                  <Logo className="h-16 w-16" />
                  <div>
                      <h1 className="text-3xl font-bold text-primary">SCAN REPORT</h1>
                      <p className="text-sm text-gray-600">{selectedScan?.bodyPart} Scan</p>
                  </div>
              </div>
              <div className="text-right text-sm text-gray-700">
                  <p className="font-bold">Ultrasound Project</p>
                  <p>Dr. Anjali Sharma</p>
                  <p>Shivalik College of Engineering, Dehradun</p>
              </div>
            </header>

            <section className="grid grid-cols-2 gap-x-8 gap-y-4 border-y py-4 mb-8">
                <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">Patient Name</p>
                    <p className="font-semibold">{selectedPatient?.name}</p>
                </div>
                <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">Scan Date</p>
                    <p className="font-semibold">{selectedScan?.date}</p>
                </div>
                <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">Age / Gender</p>
                    <p className="font-semibold">{selectedPatient?.age} Years / {selectedPatient?.gender}</p>
                </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">Scan ID</p>
                    <p className="font-semibold">{selectedScan?.id}</p>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                {selectedScan?.report ? (
                    <>
                        <div className="bg-primary/5 p-4 rounded-lg">
                            <h3 className="font-bold text-primary mb-2">SCAN FINDINGS</h3>
                            <p className="text-sm text-gray-700">{selectedScan.report.pathologyAnalysis}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-primary mb-2">AI-Powered Analysis</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gray-100 p-3 rounded-lg">
                                <p className="text-xs text-gray-500">CONFIDENCE</p>
                                <p className="font-semibold text-gray-800">{selectedScan.report.confidenceLevel}</p>
                              </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg h-full flex items-center justify-center">
                        <p>No AI analysis available for this scan.</p>
                    </div>
                )}
              </div>
              {selectedScan?.imageUrl && (
                  <div className="rounded-lg overflow-hidden border-2 border-gray-200">
                  <Image
                      src={selectedScan.imageUrl}
                      alt={`Scan for ${selectedScan.bodyPart}`}
                      width={800}
                      height={600}
                      className="object-cover w-full"
                  />
                  </div>
              )}
            </section>
            
            {selectedScan?.report && (
              <section>
                <h3 className="font-bold text-primary border-b-2 border-primary/30 pb-1 mb-3">RECOMMENDATIONS</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {selectedScan.report.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                </ul>
              </section>
            )}

          </div>
          <DialogFooter className="print:hidden bg-gray-50 p-3 border-t">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print Report
            </Button>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download Image
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
            background: white;
            border: none;
            box-shadow: none;
            padding: 2rem;
            margin: 0;
          }
           .printable-content {
            display: block;
            color: black;
          }
        }
      `}</style>
    </>
  );
};

export default PatientsPage;
