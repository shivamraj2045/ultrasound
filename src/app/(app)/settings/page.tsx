'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Hospital } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const SettingsPage = () => {
    const { toast } = useToast();
    const [clinicName, setClinicName] = useState('City Family Clinic');
    const [doctorName, setDoctorName] = useState('Dr. Rajesh Sharma');
    const [licenseNumber, setLicenseNumber] = useState('MED123456');
    const [address, setAddress] = useState('123 Medical Street, Health City, HC 123456');

    const handleSave = () => {
        // Here you would typically save the data to a backend
        toast({
            title: "Settings Saved",
            description: "Your clinic information has been successfully updated.",
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
                    <CardTitle className="flex items-center gap-2">
                        <Hospital className="w-5 h-5" />
                        Clinic Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="clinicName">Clinic Name</Label>
                        <Input 
                            id="clinicName" 
                            value={clinicName} 
                            onChange={(e) => setClinicName(e.target.value)} 
                            placeholder="Your Clinic Name"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="doctorName">Doctor Name</Label>
                            <Input 
                                id="doctorName" 
                                value={doctorName} 
                                onChange={(e) => setDoctorName(e.target.value)} 
                                placeholder="e.g. Dr. Rajesh Sharma"
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
