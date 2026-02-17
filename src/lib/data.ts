import type { Patient, Scan, Alert, Video, BodyPart } from '@/lib/types';
import { Abdomen, Hand, Heart, Kidneys, PregnantWoman } from '@/components/icons/BodyParts';

export const patientsData: Patient[] = [
  { id: 'p001', name: 'Aman Bhardwaj', age: 21, gender: 'Male', phone: '9876543210', address: 'Shivalik College of Engineering, Dehradun', totalScans: 2, lastScan: '2023-10-15' },
  { id: 'p002', name: 'Ankit Raj', age: 22, gender: 'Male', phone: '9876543211', address: 'Shivalik College of Engineering, Dehradun', totalScans: 1, lastScan: '2023-09-22' },
  { id: 'p003', name: 'Shivam Kumar', age: 20, gender: 'Male', phone: '9876543212', address: 'Shivalik College of Engineering, Dehradun', totalScans: 1, lastScan: '2023-11-01' },
  { id: 'p004', name: 'Shivam Raj', age: 21, gender: 'Male', phone: '9876543213', address: 'Shivalik College of Engineering, Dehradun', totalScans: 1, lastScan: '2023-08-10' },
  { id: 'p005', name: 'Priya Singh', age: 22, gender: 'Female', phone: '9876543214', address: 'Shivalik College of Engineering, Dehradun', totalScans: 0, lastScan: null },
];

export const scansData: Scan[] = [
  { id: 's001', patientId: 'p001', patientName: 'Aman Bhardwaj', bodyPart: 'Cardiac', date: '2023-10-15', creditsUsed: 8, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s001/300/200' },
  { id: 's002', patientId: 'p002', patientName: 'Ankit Raj', bodyPart: 'Kidney', date: '2023-09-22', creditsUsed: 5, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s002/300/200' },
  { id: 's003', patientId: 'p003', patientName: 'Shivam Kumar', bodyPart: 'Abdomen', date: '2023-11-01', creditsUsed: 4, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s003/300/200' },
  { id: 's004', patientId: 'p001', patientName: 'Aman Bhardwaj', bodyPart: 'Kidney', date: '2023-07-05', creditsUsed: 5, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s004/300/200' },
  { id: 's005', patientId: 'p004', patientName: 'Shivam Raj', bodyPart: 'Right Hand', date: '2023-08-10', creditsUsed: 3, status: 'Completed', imageUrl: 'https://picsum.photos/seed/s005/300/200' },
];

export const alertsData: Alert[] = [
  { id: 'a001', type: 'Medical', title: 'Abnormal Cardiac Scan', description: "Patient Aman Bhardwaj's scan shows potential arrhythmia. Immediate review required.", timestamp: '2023-10-15T14:30:00Z', read: false },
  { id: 'a002', type: 'Business', title: 'Low Credits', description: 'Your clinic has only 25 credits remaining. Please purchase more to avoid service interruption.', timestamp: '2023-11-02T09:00:00Z', read: false },
  { id: 'a003', type: 'System', title: 'Device Battery Low', description: 'Handheld device battery is at 15%. Please charge soon.', timestamp: '2023-11-03T11:45:00Z', read: true },
  { id: 'a004', type: 'Business', title: 'Subscription Expiring Soon', description: 'Your annual subscription will expire in 15 days.', timestamp: '2023-11-01T10:00:00Z', read: true },
];

export const videosData: Video[] = [
  { id: 'v001', title: 'Basic Ultrasound Operation & Safety Protocols', description: 'Training Module', thumbnailUrl: 'training-video', type: 'Training', duration: '45:23', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'v002', title: 'Cardiac Scan Techniques & Analysis', description: 'Advanced Techniques', thumbnailUrl: 'training-video', type: 'Training', duration: '32:15', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'v005', title: 'Kidney Ultrasound: Complete Guide', description: 'Specialist Training', thumbnailUrl: 'training-video', type: 'Training', duration: '28:40', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'v006', title: 'Pregnancy Ultrasound: First Trimester', description: 'OB/GYN Series', thumbnailUrl: 'training-video', type: 'Training', duration: '38:50', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'v007', title: 'How to Apply a Bandage Correctly', description: 'First Aid Basics', thumbnailUrl: 'educational-video', type: 'Educational', duration: '03:10', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'v008', title: 'Using Antiseptics for Wound Care', description: 'First Aid Basics', thumbnailUrl: 'educational-video', type: 'Educational', duration: '04:55', youtubeUrl: 'https://youtu.be/3kAWRs_hMxg?si=TaXHc1UC1gpYrVKC' },
  { id: 'v009', title: 'Applying a Hot Compress (Garam Patti)', description: 'Home Remedies', thumbnailUrl: 'educational-video', type: 'Educational', duration: '02:30', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
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
