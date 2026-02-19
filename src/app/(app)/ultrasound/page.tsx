'use client';

import React, { useState, useMemo, useTransition } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/hooks/use-app-context';
import { bodyParts } from '@/lib/data';
import type { Patient, BodyPart as BodyPartType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { generatePathologyReport } from '@/actions/ultrasound';
import { Loader2, Sparkles, CheckCircle, PlusCircle, Waves } from 'lucide-react';
import { ScanPathologyAnalysisOutput } from '@/ai/flows/scan-pathology-analysis';
import Logo from '@/components/icons/Logo';
import { Badge } from '@/components/ui/badge';

type ScanStep = 'select_patient' | 'select_part' | 'confirm_scan' | 'scanning' | 'generate_report' | 'view_report';

const AddPatientForm = ({ onPatientAdded }: { onPatientAdded: (newPatient: Patient) => void }) => {
    const { addPatient } = useAppContext();
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | ''>('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!name || !age || !gender || !phone || !address) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please fill in all fields.",
        });
        return;
      }
      const newPatient = addPatient({ name, age: parseInt(age), gender, phone, address });
      toast({
        title: "Success",
        description: "New patient has been added.",
      });
      setName('');
      setAge('');
      setGender('');
      setPhone('');
      setAddress('');
      onPatientAdded(newPatient);
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4 pt-4">
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
        <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 9876543210" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. 123, Main St, Mumbai" />
        </div>
        <DialogFooter>
          <Button type="submit">Save Patient</Button>
        </DialogFooter>
      </form>
    );
};

const UltrasoundPage = () => {
  const { patients, credits, addScan, findPatientById } = useAppContext();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [step, setStep] = useState<ScanStep>('select_patient');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [selectedPart, setSelectedPart] = useState<BodyPartType | null>(null);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [scanImageUrl, setScanImageUrl] = useState<string>('');

  const [scanDescription, setScanDescription] = useState('');
  const [generatedReport, setGeneratedReport] = useState<ScanPathologyAnalysisOutput | null>(null);

  const selectedPatient = useMemo(() => findPatientById(selectedPatientId), [selectedPatientId, findPatientById]);
  
  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setStep('select_part');
  };

  const handlePatientAdded = (newPatient: Patient) => {
    setIsAddPatientModalOpen(false);
    handleSelectPatient(newPatient.id);
  };

  const handleSelectPart = (part: BodyPartType) => {
    if (credits < part.credits) {
      toast({
        variant: 'destructive',
        title: 'Insufficient Credits',
        description: `You need ${part.credits} credits for this scan, but you only have ${credits}.`,
      });
      return;
    }
    setSelectedPart(part);
    setStep('confirm_scan');
  };

  const handleConfirmScan = () => {
    if (!selectedPatient || !selectedPart) return;
    const imageUrl = `https://picsum.photos/seed/${new Date().getTime()}/800/600`;
    setScanImageUrl(imageUrl);

    addScan({
      patientId: selectedPatient.id,
      bodyPart: selectedPart.name,
      date: new Date().toISOString().split('T')[0],
      creditsUsed: selectedPart.credits,
      status: 'Completed',
      imageUrl: imageUrl,
      report: undefined,
    });
    setStep('scanning');
    toast({
        title: 'Scan Started',
        description: `${selectedPart.credits} credits have been deducted.`,
    })
  };

  const handleGenerateReport = () => {
    if (!selectedPatient || !selectedPart || !scanDescription) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please provide scan findings.' });
        return;
    }
    startTransition(async () => {
        const result = await generatePathologyReport({
            patientHistory: `Age: ${selectedPatient.age}, Gender: ${selectedPatient.gender}, Phone: ${selectedPatient.phone}, Address: ${selectedPatient.address}`,
            bodyPart: selectedPart.name,
            ultrasoundScanDescription: scanDescription,
        });

        if (result.success && result.data) {
            setGeneratedReport(result.data);
            setStep('view_report');
            toast({ title: 'Success', description: 'AI report generated successfully.' });
        } else {
            toast({ variant: 'destructive', title: 'AI Error', description: result.error });
        }
    });
  };

  const resetFlow = () => {
    setStep('select_patient');
    setSelectedPatientId('');
    setSelectedPart(null);
    setScanDescription('');
    setGeneratedReport(null);
    setScanImageUrl('');
  }

  const renderStep = () => {
    switch (step) {
      case 'select_patient':
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Step 1: Select Patient</CardTitle>
              <CardDescription>Choose an existing patient or add a new one to begin the scan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select onValueChange={handleSelectPatient} value={selectedPatientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a patient..." />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name} (ID: {p.id})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog open={isAddPatientModalOpen} onOpenChange={setIsAddPatientModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add New Patient
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Patient</DialogTitle>
                      <DialogDescription>
                        Enter the new patient's details below. Click 'Save Patient' when done.
                      </DialogDescription>
                    </DialogHeader>
                    <AddPatientForm onPatientAdded={handlePatientAdded} />
                  </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        );
      case 'select_part':
        return (
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                    <Card className="aspect-video bg-slate-800 border-slate-700 flex items-center justify-center">
                        <div className="text-center text-slate-400">
                            <Waves className="mx-auto h-16 w-16" />
                            <h3 className="mt-4 text-lg font-semibold">Live Scan Preview</h3>
                            <p className="mt-1 text-sm">Select a scan type to begin.</p>
                        </div>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Scan Settings</CardTitle>
                            <CardDescription>Patient: {selectedPatient?.name}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Label>Scan Type</Label>
                            {bodyParts.map((part) => (
                                <button
                                    key={part.name}
                                    onClick={() => handleSelectPart(part)}
                                    disabled={credits < part.credits}
                                    className={cn(
                                        "w-full border bg-card rounded-xl p-4 text-left transition-all duration-300 group",
                                        "flex items-center gap-4",
                                        credits < part.credits
                                            ? "opacity-60 cursor-not-allowed"
                                            : "hover:border-primary hover:shadow-lg hover:-translate-y-1"
                                    )}
                                >
                                    <div className={cn(
                                        "p-3 rounded-lg bg-primary/10 transition-colors",
                                        credits >= part.credits && "group-hover:bg-primary"
                                        )}>
                                        <part.icon className={cn(
                                            "w-6 h-6 text-primary transition-colors",
                                            credits >= part.credits && "group-hover:text-primary-foreground"
                                        )} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-card-foreground">{part.name}</p>
                                        <p className="text-sm text-muted-foreground">{part.description}</p>
                                    </div>
                                    <Badge variant={credits < part.credits ? "secondary" : "outline"} className="font-mono text-sm py-1 px-3">
                                        {part.credits}
                                    </Badge>
                                </button>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" onClick={() => setStep('select_patient')}>Back</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        );
      case 'scanning':
        return (
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                    <div className="w-full bg-[#1e293b] text-slate-100 rounded-lg shadow-2xl overflow-hidden border border-slate-700">
                        <header className="p-4 flex justify-between items-center bg-slate-900/50">
                            <div className="flex items-center gap-3">
                                <Waves className="h-7 w-7 text-primary" />
                                <h2 className="text-xl font-semibold">Live Scan Preview</h2>
                            </div>
                            <Badge variant="outline" className="text-green-400 border-green-400/50 bg-green-900/30">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping absolute opacity-75"></span>
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                Device Active
                            </Badge>
                        </header>
                        <main className="relative aspect-video bg-slate-900 overflow-hidden">
                            {scanImageUrl && (
                                <Image
                                    src={scanImageUrl}
                                    alt="Live ultrasound scan"
                                    fill
                                    className="object-cover opacity-90"
                                />
                            )}
                        </main>
                        <footer className="p-4 bg-slate-900/50 flex justify-between items-center">
                            <div className="text-sm text-slate-300">
                                <p className="font-semibold">Patient: {selectedPatient?.name}</p>
                                <p className="text-xs text-slate-400">Scan Type: {selectedPart?.name}</p>
                            </div>
                            <Button onClick={() => setStep('generate_report')} size="lg">
                                Capture Image
                            </Button>
                        </footer>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Scan Settings</CardTitle>
                            <CardDescription>Scan in progress...</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Label>Scan Type</Label>
                            {bodyParts.map((part) => (
                                <div
                                    key={part.name}
                                    className={cn(
                                        "w-full border bg-card rounded-xl p-4 text-left transition-all duration-300",
                                        "flex items-center gap-4",
                                        selectedPart?.name === part.name
                                            ? "border-primary ring-2 ring-primary/50 shadow-lg"
                                            : "opacity-50"
                                    )}
                                >
                                    <div className={cn(
                                        "p-3 rounded-lg bg-primary/10 transition-colors",
                                        selectedPart?.name === part.name && "bg-primary"
                                        )}>
                                        <part.icon className={cn(
                                            "w-6 h-6 text-primary transition-colors",
                                            selectedPart?.name === part.name && "text-primary-foreground"
                                        )} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-card-foreground">{part.name}</p>
                                        <p className="text-sm text-muted-foreground">{part.description}</p>
                                    </div>
                                    <Badge variant={selectedPart?.name === part.name ? "default" : "secondary"} className="font-mono text-sm py-1 px-3">
                                        {part.credits}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
      case 'generate_report':
        return (
            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary w-6 h-6" /> AI-Powered Report Generation</CardTitle>
                    <CardDescription>The scan is complete. Please add your observations to generate an AI-powered pathology analysis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="description">Ultrasound Scan Findings</Label>
                        <Textarea 
                            id="description" 
                            placeholder="Describe your findings, observations, and any abnormalities noted..." 
                            value={scanDescription}
                            onChange={(e) => setScanDescription(e.target.value)}
                            rows={6}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleGenerateReport} disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Generate Report
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
      case 'view_report':
        return(
            <Card className="w-full max-w-4xl mx-auto">
              <div className="bg-white p-8 text-black rounded-t-lg">
                <header className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                        <Logo className="h-16 w-16" />
                        <div>
                            <h1 className="text-3xl font-bold text-primary">SCAN REPORT</h1>
                            <p className="text-sm text-muted-foreground">{selectedPart?.name} Scan</p>
                        </div>
                    </div>
                    <div className="text-right text-sm">
                        <p className="font-bold">Ultrasound Probe</p>
                        <p className="text-muted-foreground">Dr. Shivam Raj</p>
                        <p className="text-muted-foreground">123 Demo St, Example City</p>
                    </div>
                </header>

                <section className="bg-muted/30 rounded-lg p-4 mb-8 border border-muted/50">
                    <h2 className="text-lg font-semibold mb-4 text-primary">Patient Details</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-muted-foreground">Patient Name</p>
                            <p className="font-semibold">{selectedPatient?.name}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-muted-foreground">Age / Gender</p>
                            <p className="font-semibold">{selectedPatient?.age} Years / {selectedPatient?.gender}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-muted-foreground">Scan Date</p>
                            <p className="font-semibold">{new Date().toISOString().split('T')[0]}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-muted-foreground">Scan Details</p>
                            <p className="font-semibold">New Scan</p>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
                    <div className="md:col-span-2 rounded-lg overflow-hidden border">
                        {scanImageUrl && (
                            <Image
                                src={scanImageUrl}
                                alt={`Scan for ${selectedPart?.name}`}
                                width={800}
                                height={800}
                                className="object-cover w-full h-full"
                            />
                        )}
                    </div>
                    <div className="md:col-span-3 space-y-6">
                        {generatedReport ? (
                            <>
                                <div>
                                    <h3 className="font-bold text-primary mb-2 text-lg">AI-Powered Analysis</h3>
                                    <div className="bg-primary/5 p-4 rounded-lg space-y-4 border border-primary/20">
                                        <div>
                                            <h4 className="font-semibold text-primary/80 mb-1">Scan Findings</h4>
                                            <p className="text-sm text-foreground/80">{generatedReport.pathologyAnalysis}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-primary/80 mb-1">Confidence Level</h4>
                                            <Badge variant={
                                                generatedReport.confidenceLevel === 'High' ? 'default'
                                                : generatedReport.confidenceLevel === 'Medium' ? 'secondary'
                                                : 'destructive'
                                            }>
                                                {generatedReport.confidenceLevel}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary mb-2 text-lg">Recommendations</h3>
                                    <ul className="list-disc list-inside text-sm text-foreground/80 space-y-2 pl-2">
                                        {generatedReport.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <div className="p-4 text-center text-muted-foreground bg-muted/20 rounded-lg h-full flex items-center justify-center border border-dashed">
                                <p>Generating AI analysis...</p>
                            </div>
                        )}
                    </div>
                </section>
              </div>
              <CardFooter className="bg-muted/20 border-t rounded-b-lg p-3">
                  <Button onClick={resetFlow}><CheckCircle className="mr-2 h-4 w-4" />Done & New Scan</Button>
              </CardFooter>
            </Card>
        )

      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold tracking-tight">New Ultrasound Scan</h1>
        <div className="flex flex-col items-center justify-center flex-1">
          {renderStep()}
        </div>
        
        <AlertDialog open={step === 'confirm_scan'} onOpenChange={(open) => !open && setStep('select_part')}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Confirm Scan</AlertDialogTitle>
                <AlertDialogDescription>
                This scan for <span className="font-semibold">{selectedPatient?.name}</span> on the <span className="font-semibold">{selectedPart?.name}</span> will deduct <span className="font-semibold">{selectedPart?.credits} credits</span> from your balance. Your new balance will be {credits - (selectedPart?.credits ?? 0)}.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setStep('select_part')}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmScan}>Confirm and Proceed</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
};

export default UltrasoundPage;
