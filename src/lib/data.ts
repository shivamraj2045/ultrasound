import type { Patient, Scan, Alert, Video, BodyPart } from '@/lib/types';
import { Abdomen, Hand, Heart, Kidneys, PregnantWoman } from '@/components/icons/BodyParts';
import type { ScanPathologyAnalysisOutput } from '@/ai/flows/scan-pathology-analysis';
import { AlertTriangle, Clock, BatteryWarning, CreditCard } from 'lucide-react';

const sampleReport: ScanPathologyAnalysisOutput = {
    pathologyAnalysis: "The scan shows evidence of moderate fatty infiltration in the liver (hepatic steatosis). The gallbladder wall appears slightly thickened, which may suggest chronic cholecystitis. No focal lesions or biliary duct dilation observed.",
    confidenceLevel: 'Medium',
    recommendations: [
        "Recommend liver function tests (LFTs) to assess liver health.",
        "Advise patient on lifestyle and dietary modifications to manage fatty liver.",
        "A follow-up ultrasound in 3-6 months is suggested to monitor the condition.",
        "Consultation with a gastroenterologist is recommended for further evaluation."
    ]
};

export const patientsData: Patient[] = [
  { id: 'p001', name: 'Aman Bhardwaj', age: 19, gender: 'Male', phone: '+91*********', address: 'Shivalik college of engineering', totalScans: 2, lastScan: '2023-10-15' },
  { id: 'p002', name: 'Ankit Raj', age: 20, gender: 'Male', phone: '+91*********', address: 'Shivalik college of engineering', totalScans: 1, lastScan: '2023-09-22' },
  { id: 'p003', name: 'Shivam Kumar', age: 21, gender: 'Male', phone: '+91*********', address: 'Shivalik college of engineering', totalScans: 1, lastScan: '2023-11-01' },
  { id: 'p004', name: 'Shivam Raj', age: 20, gender: 'Male', phone: '+91*********', address: 'Shivalik college of engineering', totalScans: 1, lastScan: '2023-11-05' },
];

export const scansData: Scan[] = [
  { id: 's001', patientId: 'p001', patientName: 'Aman Bhardwaj', bodyPart: 'Cardiac', date: '2023-10-15', creditsUsed: 8, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s001/800/600', report: sampleReport },
  { id: 's002', patientId: 'p002', patientName: 'Ankit Raj', bodyPart: 'Kidney', date: '2023-09-22', creditsUsed: 5, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s002/800/600', report: {...sampleReport, pathologyAnalysis: "Both kidneys appear normal in size and echotexture. No evidence of hydronephrosis, cysts, or calculi. Corticomedullary differentiation is well-preserved."} },
  { id: 's003', patientId: 'p003', patientName: 'Shivam Kumar', bodyPart: 'Abdomen', date: '2023-11-01', creditsUsed: 4, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s003/800/600', report: sampleReport },
  { id: 's004', patientId: 'p001', patientName: 'Aman Bhardwaj', bodyPart: 'Kidney', date: '2023-07-05', creditsUsed: 5, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s004/800/600', report: {...sampleReport, pathologyAnalysis: "A simple 2cm cyst is noted in the upper pole of the left kidney. This is likely a benign finding. The right kidney is unremarkable."} },
  { id: 's005', patientId: 'p004', patientName: 'Shivam Raj', bodyPart: 'Cardiac', date: '2023-11-05', creditsUsed: 8, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s005/800/600', report: {...sampleReport, pathologyAnalysis: "Cardiac scan shows irregular pattern requiring immediate attention."} },
];

export const alertsData: Alert[] = [
  { 
    id: 'a001', 
    type: 'Medical', 
    priority: 'High',
    icon: AlertTriangle,
    title: 'Abnormal Reading Detected', 
    description: "Cardiac scan for Patient Shivam Raj shows irregular pattern requiring immediate attention.", 
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), 
    details: 'Patient: Shivam Raj',
    read: false 
  },
  { 
    id: 'a002', 
    type: 'System',
    priority: 'Medium', 
    icon: BatteryWarning,
    title: 'Device Battery Low', 
    description: 'Ultrasound device battery at 15%. Please recharge to avoid interruption during procedures.', 
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    details: 'Device: UltrasoundPro X1',
    read: false 
  },
  { 
    id: 'a003',
    type: 'Business',
    priority: 'Low',
    icon: CreditCard,
    title: 'Credits Running Low', 
    description: 'Only 42 credits remaining. Consider purchasing more credits to continue uninterrupted service.', 
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    details: 'Balance: 42 credits',
    read: false 
  },
];

export const videosData: Video[] = [
  { id: 'v001', title: 'Basic Ultrasound Operation & Safety Protocols', description: 'Training Module', thumbnailUrl: 'training-video', type: 'Training', duration: '45:23', youtubeUrl: '' },
  { id: 'v002', title: 'Cardiac Scan Techniques & Analysis', description: 'Advanced Techniques', thumbnailUrl: 'training-video', type: 'Training', duration: '32:15', youtubeUrl: '' },
  { id: 'v005', title: 'Kidney Ultrasound: Complete Guide', description: 'Specialist Training', thumbnailUrl: 'training-video', type: 'Training', duration: '28:40', youtubeUrl: '' },
  { id: 'v006', title: 'Pregnancy Ultrasound: First Trimester', description: 'OB/GYN Series', thumbnailUrl: 'training-video', type: 'Training', duration: '38:50', youtubeUrl: '' },
  { id: 'v007', title: 'How to Apply a Bandage Correctly', description: 'First Aid Basics', thumbnailUrl: 'educational-video', type: 'Educational', duration: '03:10', youtubeUrl: 'https://youtu.be/Ek0GU51kUuY?si=El2V1efNIP4fWDKK' },
  { id: 'v008', title: 'Using Antiseptics for Wound Care', description: 'First Aid Basics', thumbnailUrl: 'antiseptic-video', type: 'Educational', duration: '04:55', youtubeUrl: 'https://youtu.be/3kAWRs_hMxg?si=TaXHc1UC1gpYrVKC' },
  { id: 'v009', title: 'Applying a Hot Compress (Garam Patti)', description: 'Home Remedies', thumbnailUrl: 'educational-video', type: 'Educational', duration: '02:30', youtubeUrl: '' },
  { id: 'v010', title: 'The Right Way to Tie a Crepe Bandage', description: 'First Aid Basics', thumbnailUrl: 'crepe-bandage', type: 'Educational', duration: '05:17', youtubeUrl: 'https://youtu.be/CQBN45mPPHs?si=4x3oCR5mWGzr5QPP' }
];

export const bodyParts: BodyPart[] = [
    { name: 'Abdomen', credits: 4, icon: Abdomen, estimatedCost: 40, averageDuration: '15-20 mins' },
    { name: 'Kidney', credits: 5, icon: Kidneys, estimatedCost: 50, averageDuration: '15-25 mins' },
    { name: 'Left Hand', credits: 3, icon: Hand, estimatedCost: 30, averageDuration: '10-15 mins' },
    { name: 'Right Hand', credits: 3, icon: Hand, estimatedCost: 30, averageDuration: '10-15 mins' },
    { name: 'Pregnancy', credits: 6, icon: PregnantWoman, estimatedCost: 60, averageDuration: '25-30 mins' },
    { name: 'Cardiac', credits: 8, icon: Heart, estimatedCost: 80, averageDuration: '30-40 mins' },
];

export const creditPackages = [
  { name: 'Starter', credits: 100, price: 1000, bestValue: false, description: '10 credits per ₹100' },
  { name: 'Professional', credits: 300, price: 2500, bestValue: true, description: 'Best value - 17% savings' },
  { name: 'Enterprise', credits: 1000, price: 7000, bestValue: false, description: 'Bulk discount - 30% savings' },
];
