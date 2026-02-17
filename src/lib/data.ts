import type { Patient, Scan, Alert, Video, BodyPart } from '@/lib/types';
import { Abdomen, Hand, Heart, Kidneys, PregnantWoman } from '@/components/icons/BodyParts';
import type { ScanPathologyAnalysisOutput } from '@/ai/flows/scan-pathology-analysis';

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
  { id: 'p001', name: 'Aman Bhardwaj', age: 21, gender: 'Male', phone: '9876543210', address: 'Shivalik College of Engineering, Dehradun', totalScans: 2, lastScan: '2023-10-15' },
  { id: 'p002', name: 'Ankit Raj', age: 22, gender: 'Male', phone: '9876543211', address: 'Shivalik College of Engineering, Dehradun', totalScans: 1, lastScan: '2023-09-22' },
  { id: 'p003', name: 'Shivam Kumar', age: 20, gender: 'Male', phone: '9876543212', address: 'Shivalik College of Engineering, Dehradun', totalScans: 1, lastScan: '2023-11-01' },
  { id: 'p004', name: 'Shivam Raj', age: 21, gender: 'Male', phone: '9876543213', address: 'Shivalik College of Engineering, Dehradun', totalScans: 1, lastScan: '2023-08-10' },
  { id: 'p005', name: 'Priya Singh', age: 22, gender: 'Female', phone: '9876543214', address: 'Shivalik College of Engineering, Dehradun', totalScans: 0, lastScan: null },
];

export const scansData: Scan[] = [
  { id: 's001', patientId: 'p001', patientName: 'Aman Bhardwaj', bodyPart: 'Cardiac', date: '2023-10-15', creditsUsed: 8, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s001/800/600', report: sampleReport },
  { id: 's002', patientId: 'p002', patientName: 'Ankit Raj', bodyPart: 'Kidney', date: '2023-09-22', creditsUsed: 5, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s002/800/600', report: {...sampleReport, pathologyAnalysis: "Both kidneys appear normal in size and echotexture. No evidence of hydronephrosis, cysts, or calculi. Corticomedullary differentiation is well-preserved."} },
  { id: 's003', patientId: 'p003', patientName: 'Shivam Kumar', bodyPart: 'Abdomen', date: '2023-11-01', creditsUsed: 4, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s003/800/600', report: sampleReport },
  { id: 's004', patientId: 'p001', patientName: 'Aman Bhardwaj', bodyPart: 'Kidney', date: '2023-07-05', creditsUsed: 5, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s004/800/600', report: {...sampleReport, pathologyAnalysis: "A simple 2cm cyst is noted in the upper pole of the left kidney. This is likely a benign finding. The right kidney is unremarkable."} },
  { id: 's005', patientId: 'p004', patientName: 'Shivam Raj', bodyPart: 'Right Hand', date: '2023-08-10', creditsUsed: 3, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s005/800/600', report: {...sampleReport, pathologyAnalysis: "No significant soft tissue or structural abnormalities detected in the scanned area of the right hand. No signs of inflammation or fluid collection."} },
];

export const alertsData: Alert[] = [
  { id: 'a001', type: 'Medical', title: 'Abnormal Cardiac Scan', description: "Patient Aman Bhardwaj's scan shows potential arrhythmia. Immediate review required.", timestamp: '2023-10-15T14:30:00Z', read: false },
  { id: 'a002', type: 'Business', title: 'Low Credits', description: 'Your clinic has only 25 credits remaining. Please purchase more to avoid service interruption.', timestamp: '2023-11-02T09:00:00Z', read: false },
  { id: 'a003', type: 'System', title: 'Device Battery Low', description: 'Handheld device battery is at 15%. Please charge soon.', timestamp: '2023-11-03T11:45:00Z', read: true },
  { id: 'a004', type: 'Business', title: 'Subscription Expiring Soon', description: 'Your annual subscription will expire in 15 days.', timestamp: '2023-11-01T10:00:00Z', read: true },
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
    { name: 'Abdomen', credits: 4, icon: Abdomen },
    { name: 'Kidney', credits: 5, icon: Kidneys },
    { name: 'Left Hand', credits: 3, icon: Hand },
    { name: 'Right Hand', credits: 3, icon: Hand },
    { name: 'Pregnancy', credits: 6, icon: PregnantWoman },
    { name: 'Cardiac', credits: 8, icon: Heart },
];

export const creditPackages = [
  { credits: 100, price: 1000, bestValue: false },
  { credits: 300, price: 2500, bestValue: true },
  { credits: 1000, price: 7000, bestValue: false },
];
