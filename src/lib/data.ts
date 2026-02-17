import type { Patient, Scan, Alert, Video, BodyPart } from '@/lib/types';
import { Abdomen, Hand, Heart, Kidneys, PregnantWoman } from '@/components/icons/BodyParts';

export const patientsData: Patient[] = [
  { id: 'p001', name: 'Ramesh Kumar', age: 45, gender: 'Male', totalScans: 3, lastScan: '2023-10-15' },
  { id: 'p002', name: 'Sita Sharma', age: 32, gender: 'Female', totalScans: 2, lastScan: '2023-09-22' },
  { id: 'p003', name: 'Amit Patel', age: 51, gender: 'Male', totalScans: 5, lastScan: '2023-11-01' },
  { id: 'p004', name: 'Priya Singh', age: 28, gender: 'Female', totalScans: 1, lastScan: '2023-08-10' },
  { id: 'p005', name: 'Vijay Reddy', age: 62, gender: 'Male', totalScans: 4, lastScan: '2023-10-28' },
];

export const scansData: Scan[] = [
  { id: 's001', patientId: 'p001', patientName: 'Ramesh Kumar', bodyPart: 'Cardiac', date: '2023-10-15', creditsUsed: 8, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s001/300/200' },
  { id: 's002', patientId: 'p002', patientName: 'Sita Sharma', bodyPart: 'Pregnancy', date: '2023-09-22', creditsUsed: 6, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s002/300/200' },
  { id: 's003', patientId: 'p003', patientName: 'Amit Patel', bodyPart: 'Abdomen', date: '2023-11-01', creditsUsed: 4, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s003/300/200' },
  { id: 's004', patientId: 'p001', patientName: 'Ramesh Kumar', bodyPart: 'Kidney', date: '2023-07-05', creditsUsed: 5, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s004/300/200' },
  { id: 's005', patientId: 'p004', patientName: 'Priya Singh', bodyPart: 'Right Hand', date: '2023-08-10', creditsUsed: 3, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s005/300/200' },
];

export const alertsData: Alert[] = [
  { id: 'a001', type: 'Medical', title: 'Abnormal Cardiac Scan', description: 'Patient Ramesh Kumar\'s scan shows potential arrhythmia. Immediate review required.', timestamp: '2023-10-15T14:30:00Z', read: false },
  { id: 'a002', type: 'Business', title: 'Low Credits', description: 'Your clinic has only 25 credits remaining. Please purchase more to avoid service interruption.', timestamp: '2023-11-02T09:00:00Z', read: false },
  { id: 'a003', type: 'System', title: 'Device Battery Low', description: 'Handheld device battery is at 15%. Please charge soon.', timestamp: '2023-11-03T11:45:00Z', read: true },
  { id: 'a004', type: 'Business', title: 'Subscription Expiring Soon', description: 'Your annual subscription will expire in 15 days.', timestamp: '2023-11-01T10:00:00Z', read: true },
];

export const videosData: Video[] = [
  { id: 'v001', title: 'Basic Ultrasound Techniques', description: 'Learn the fundamentals of handheld ultrasound scanning.', thumbnailUrl: 'training-video', type: 'Training' },
  { id: 'v002', title: 'Cardiac Scan Best Practices', description: 'A guide to performing accurate cardiac examinations.', thumbnailUrl: 'training-video', type: 'Training' },
  { id: 'v003', title: 'Scan: S. Sharma - Pregnancy', description: 'Recorded scan from 2023-09-22.', thumbnailUrl: 'recorded-scan', type: 'Recorded' },
  { id: 'v004', title: 'Scan: R. Kumar - Cardiac', description: 'Recorded scan from 2023-10-15.', thumbnailUrl: 'recorded-scan', type: 'Recorded' },
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
