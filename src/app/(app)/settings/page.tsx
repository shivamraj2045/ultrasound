'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Hospital, User } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/hooks/use-app-context';
import { Separator } from '@/components/ui/separator';

const SettingsPage = () => {
    const { toast } = useToast();
    const { doctorName, setDoctorName, email, setEmail } = useAppContext();
    
    // Local state for all form fields
    const [localDoctorName, setLocalDoctorName] = useState(doctorName);
    const [localEmail, setLocalEmail] = useState(email);
    const [clinicName, setClinicName] = useState('City Family Clinic');
    const [licenseNumber, setLicenseNumber] = useState('MED123456');
    const [address, setAddress] = useState('123 Medical Street, Health City, HC 123456');

    useEffect(() => {
        setLocalDoctorName(doctorName);
    }, [doctorName]);

    useEffect(() => {
        setLocalEmail(email);
    }, [email]);

    const handleSave = () => {
        // Update global context only when "Save" is clicked
        setDoctorName(localDoctorName);
        setEmail(localEmail);

        // Here you would typically save all the data to a backend
        toast({
            title: "Settings Saved",
            description: "Your information has been successfully updated.",
        });
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your clinic preferences, device settings, and account information</p>
            </div>
            
            <Card className="max-w-3xl">
                <CardHeader>
                    <CardTitle>Profile & Clinic</CardTitle>
                    <CardDescription>Update your personal and clinic details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-medium flex items-center gap-2"><User className="w-5 h-5 text-primary" /> User Profile</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-7">
                            <div className="space-y-2">
                                <Label htmlFor="doctorName">User Name</Label>
                                <Input 
                                    id="doctorName" 
                                    value={localDoctorName} 
                                    onChange={(e) => setLocalDoctorName(e.target.value)} 
                                    placeholder="e.g. Dr. Shivam Raj"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input 
                                    id="email" 
                                    type="email"
                                    value={localEmail} 
                                    onChange={(e) => setLocalEmail(e.target.value)} 
                                    placeholder="e.g. shivam.raj@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="licenseNumber">License Number</Label>
                                <Input 
                                    id="licenseNumber" 
                                    value={licenseNumber} 
                                    onChange={(e) => setLicenseNumber(e.target.value)} 
                                    placeholder="e.g. MED123456"
                                />
                            </div>
                        </div>
                    </div>
                    <Separator />
                     <div className="space-y-4">
                        <h3 className="font-medium flex items-center gap-2"><Hospital className="w-5 h-5 text-primary" /> Clinic Details</h3>
                        <div className="space-y-6 pl-7">
                             <div className="space-y-2">
                                <Label htmlFor="clinicName">Clinic Name</Label>
                                <Input 
                                    id="clinicName" 
                                    value={clinicName} 
                                    onChange={(e) => setClinicName(e.target.value)} 
                                    placeholder="Your Clinic Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Clinic Address</Label>
                                <Textarea 
                                    id="address" 
                                    value={address} 
                                    onChange={(e) => setAddress(e.target.value)} 
                                    placeholder="123 Medical Street, Health City, HC 123456"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4 flex justify-end">
                    <Button onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SettingsPage;
