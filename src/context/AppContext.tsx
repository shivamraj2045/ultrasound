'use client';

import { createContext, useState, ReactNode, useMemo, useCallback } from 'react';
import type { Patient, Scan } from '@/lib/types';
import { patientsData, scansData } from '@/lib/data';

interface AppContextType {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  scans: Scan[];
  setScans: React.Dispatch<React.SetStateAction<Scan[]>>;
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
  subscriptionStatus: 'Active' | 'Inactive' | 'Expiring Soon';
  setSubscriptionStatus: React.Dispatch<React.SetStateAction<'Active' | 'Inactive' | 'Expiring Soon'>>;
  addPatient: (patient: Omit<Patient, 'id' | 'totalScans' | 'lastScan'>) => Patient;
  addScan: (scan: Omit<Scan, 'id' | 'patientName'>) => void;
  findPatientById: (id: string) => Patient | undefined;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  doctorName: string;
  setDoctorName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(patientsData);
  const [scans, setScans] = useState<Scan[]>(scansData);
  const [credits, setCredits] = useState<number>(150);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'Active' | 'Inactive' | 'Expiring Soon'>('Active');
  const [isLoading, setIsLoading] = useState(false);
  const [doctorName, setDoctorName] = useState<string>('Dr. Shivam Raj');
  const [email, setEmail] = useState<string>('shivam.raj@example.com');

  const addPatient = useCallback((patientData: Omit<Patient, 'id' | 'totalScans' | 'lastScan'>): Patient => {
    const newPatient: Patient = {
      ...patientData,
      id: `p${String(patients.length + 1).padStart(3, '0')}`,
      totalScans: 0,
      lastScan: null,
    };
    setPatients(prev => [...prev, newPatient]);
    return newPatient;
  }, [patients]);

  const addScan = useCallback((scanData: Omit<Scan, 'id' | 'patientName'>) => {
    const patient = patients.find(p => p.id === scanData.patientId);
    if (!patient) return;

    const newScan: Scan = {
      ...scanData,
      id: `s${String(scans.length + 1).padStart(3, '0')}`,
      patientName: patient.name,
    };

    setScans(prev => [newScan, ...prev]);
    setCredits(prev => prev - scanData.creditsUsed);
    setPatients(prevPatients => prevPatients.map(p => 
      p.id === scanData.patientId 
        ? { ...p, totalScans: p.totalScans + 1, lastScan: newScan.date } 
        : p
    ));
  }, [patients, scans]);

  const findPatientById = useCallback((id: string) => {
    return patients.find(p => p.id === id);
  }, [patients]);

  const contextValue = useMemo(() => ({
    patients,
    setPatients,
    scans,
    setScans,
    credits,
    setCredits,
    subscriptionStatus,
    setSubscriptionStatus,
    addPatient,
    addScan,
    findPatientById,
    isLoading,
    setIsLoading,
    doctorName,
    setDoctorName,
    email,
    setEmail,
  }), [patients, scans, credits, subscriptionStatus, isLoading, addPatient, addScan, findPatientById, doctorName, setDoctorName, email, setEmail]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}
