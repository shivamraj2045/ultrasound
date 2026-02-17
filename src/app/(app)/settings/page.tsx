'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';


const SettingsPage = () => {
    const { toast } = useToast();
    const [clinicName, setClinicName] = useState('Ultrasound Project');
    const [doctorName, setDoctorName] = useState('Dr. Anjali Sharma');
    const [phone, setPhone] = useState('9876543210');
    const [address, setAddress] = useState('Shivalik College of Engineering, Dehradun');
    const [language, setLanguage] = useState('en');
    
    const handleSave = () => {
        toast({
            title: "Settings Saved",
            description: "Your information has been updated.",
        });
    };

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Profile & Settings</CardTitle>
                    <CardDescription>Manage your personal and clinic information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">User Profile</h3>
                        <div className="space-y-2">
                            <Label htmlFor="doctorName">Doctor Name</Label>
                            <Input id="doctorName" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="phone">Contact Phone</Label>
                            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>

                    <div className="space-y-4">
                         <h3 className="text-lg font-medium">Clinic Information</h3>
                        <div className="space-y-2">
                            <Label htmlFor="clinicName">Clinic Name</Label>
                            <Input id="clinicName" value={clinicName} onChange={(e) => setClinicName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Clinic Address</Label>
                            <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Application Settings</h3>
                        <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select value={language} onValueChange={setLanguage}>
                                <SelectTrigger id="language" className="w-[180px]">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="hi">Hindi</SelectItem>
                                    <SelectItem value="bn">Bengali</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Device Status</Label>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-sm text-muted-foreground">Connected (Model: PU-101)</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
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
