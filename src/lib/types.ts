import type { ScanPathologyAnalysisOutput } from '@/ai/flows/scan-pathology-analysis';

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  address: string;
  totalScans: number;
  lastScan: string | null;
};

export type Scan = {
  id: string;
  patientId: string;
  patientName: string;
  bodyPart: string;
  date: string;
  creditsUsed: number;
  status: 'Completed' | 'Pending' | 'Failed';
  imageUrl: string;
  report?: ScanPathologyAnalysisOutput;
};

export type Alert = {
  id: string;
  type: 'Medical' | 'System' | 'Business';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
};

export type Video = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  type: 'Training' | 'Recorded' | 'Educational';
  duration: string;
  youtubeUrl: string;
};

export type BodyPart = {
  name: string;
  credits: number;
  icon: React.ComponentType<{ className?: string }>;
};
