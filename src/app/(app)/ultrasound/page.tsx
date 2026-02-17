'use client';

import React, { useState, useMemo, useEffect, useTransition } from 'react';
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
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/hooks/use-app-context';
import { bodyParts } from '@/lib/data';
import type { Patient, BodyPart as BodyPartType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { generatePathologyReport } from '@/actions/ultrasound';
import { Loader2, Sparkles, FileText, CheckCircle, PlusCircle } from 'lucide-react';
import { ScanPathologyAnalysisOutput } from '@/ai/flows/scan-pathology-analysis';

type ScanStep = 'select_patient' | 'select_part' | 'confirm_scan' | 'scanning' | 'generate_report' | 'view_report';

const AddPatientForm = ({ onPatientAdded }: { onPatientAdded: (newPatient: Patient) => void }) => {
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
      const newPatient = addPatient({ name, age: parseInt(age), gender });
      toast({
        title: "Success",
        description: "New patient has been added.",
      });
      setName('');
      setAge('');
      setGender('');
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
  const [scanProgress, setScanProgress] = useState(0);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);

  const [scanDescription, setScanDescription] = useState('');
  const [generatedReport, setGeneratedReport] = useState<ScanPathologyAnalysisOutput | null>(null);

  const selectedPatient = useMemo(() => findPatientById(selectedPatientId), [selectedPatientId, findPatientById]);

  useEffect(() => {
    if (step === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStep('generate_report');
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [step]);
  
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
    addScan({
      patientId: selectedPatient.id,
      bodyPart: selectedPart.name,
      date: new Date().toISOString().split('T')[0],
      creditsUsed: selectedPart.credits,
      status: 'Completed',
      imageUrl: `https://picsum.photos/seed/${new Date().getTime()}/600/400`,
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
            patientHistory: `Age: ${selectedPatient.age}, Gender: ${selectedPatient.gender}`,
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
    setScanProgress(0);
    setScanDescription('');
    setGeneratedReport(null);
  }

  const renderStep = () => {
    switch (step) {
      case 'select_patient':
        return (
          <Card className="w-full max-w-md">
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
                    </DialogHeader>
                    <AddPatientForm onPatientAdded={handlePatientAdded} />
                  </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        );
      case 'select_part':
        return (
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Step 2: Select Body Part</CardTitle>
              <CardDescription>Patient: <span className="font-semibold">{selectedPatient?.name}</span>. Choose the body part to scan.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {bodyParts.map((part) => (
                <button
                  key={part.name}
                  onClick={() => handleSelectPart(part)}
                  className={cn(
                    "p-4 border rounded-lg text-center hover:bg-accent transition-colors flex flex-col items-center gap-2",
                    credits < part.credits && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={credits < part.credits}
                >
                  <part.icon className="w-8 h-8 text-primary"/>
                  <span className="font-semibold">{part.name}</span>
                  <span className="text-sm text-muted-foreground">{part.credits} credits</span>
                </button>
              ))}
            </CardContent>
            <CardFooter>
                <Button variant="outline" onClick={() => setStep('select_patient')}>Back</Button>
            </CardFooter>
          </Card>
        );
      case 'scanning':
        return (
            <Card className="w-full max-w-xl text-center">
                <CardHeader>
                    <CardTitle>Scanning in Progress...</CardTitle>
                    <CardDescription>Please hold the device steady.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center text-white/50 animate-pulse" data-ai-hint="ultrasound scan">
                        <p>Live Scan Preview</p>
                    </div>
                    <Progress value={scanProgress} />
                    <p>{scanProgress}% complete</p>
                </CardContent>
            </Card>
        );
      case 'generate_report':
        return (
            <Card className="w-full max-w-xl">
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
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileText className="text-primary w-6 h-6" /> Pathology Analysis Report</CardTitle>
                    <CardDescription>
                        For <span className="font-semibold">{selectedPatient?.name}</span> - {selectedPart?.name} Scan
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Pathology Analysis</h3>
                        <p className="text-muted-foreground">{generatedReport?.pathologyAnalysis}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Confidence Level</h3>
                        <p className="text-muted-foreground font-medium">{generatedReport?.confidenceLevel}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Recommendations</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            {generatedReport?.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                        </ul>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={resetFlow}><CheckCircle className="mr-2 h-4 w-4" />Done</Button>
                </CardFooter>
            </Card>
        )

      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center flex-1">
        <h1 className="text-3xl font-bold tracking-tight self-start mb-4">New Ultrasound Scan</h1>
        {renderStep()}
        
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
