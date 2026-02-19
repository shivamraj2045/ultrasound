'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  CreditCard as CreditCardIcon,
  Landmark,
  QrCode,
  Zap,
  Crown,
  Rocket,
} from 'lucide-react';
import { useAppContext } from '@/hooks/use-app-context';
import { creditPackages, bodyParts } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const packageIcons = {
  Starter: Zap,
  Professional: Crown,
  Enterprise: Rocket,
};

const SubscriptionPage = () => {
    const { credits } = useAppContext();
    const [selectedPackage, setSelectedPackage] = useState<typeof creditPackages[number] | null>(null);
    const qrCodePlaceholder = PlaceHolderImages.find(p => p.id === 'qr-code');
    const totalCredits = 1000; // Assuming a total for progress calculation
    const creditPercentage = (credits / totalCredits) * 100;

    return (
        <>
            <div className="flex flex-col gap-8">
                <header>
                    <h1 className="text-3xl font-bold tracking-tight">Credits & Subscription</h1>
                    <p className="text-muted-foreground mt-1">Manage your credits and subscription plan for ultrasound services</p>
                </header>

                <Card className="bg-gradient-to-r from-primary to-blue-400 text-primary-foreground p-6 rounded-xl shadow-lg relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>
                    <div className="absolute right-5 -bottom-12 w-24 h-24 bg-white/10 rounded-full"></div>
                    <CardContent className="p-0 z-10 relative">
                        <p className="text-sm opacity-80">Available Credits</p>
                        <p className="text-5xl font-bold mt-1">{credits}</p>
                        <div className="mt-4 space-y-2">
                            <Progress value={creditPercentage} className="h-2 bg-white/20 [&>div]:bg-white" />
                            <div className="flex justify-between text-xs opacity-80">
                                <span>{Math.round(creditPercentage)}% remaining</span>
                                <span>Valid until: Mar 15, 2025</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-4">
                    <h3 className="font-semibold">Current Plan: Clinic Pro</h3>
                    <p className="text-sm text-muted-foreground">Valid until December 2025</p>
                </div>


                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Buy More Credits</h2>
                    <p className="text-muted-foreground">Choose a plan that fits your practice needs.</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {creditPackages.map((pkg) => {
                        const Icon = packageIcons[pkg.name as keyof typeof packageIcons];
                        return (
                        <Card 
                            key={pkg.name} 
                            className={cn(
                                "flex flex-col text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer relative overflow-hidden",
                                pkg.bestValue && "border-primary border-2"
                            )}
                            onClick={() => setSelectedPackage(pkg)}
                        >
                            {pkg.bestValue && (
                                <div className="absolute top-0 right-0 w-28 h-28">
                                    <div className="absolute transform rotate-45 bg-primary text-center text-white font-semibold py-1 right-[-34px] top-[26px] w-[150px]">
                                        Most Popular
                                    </div>
                                </div>
                            )}
                            <CardHeader className="pt-8 items-center flex-1">
                                {Icon && <Icon className="w-8 h-8 text-primary mb-4" />}
                                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                                <div className="py-4">
                                  <p className="text-5xl font-bold">{pkg.credits}</p>
                                  <p className="text-muted-foreground">Credits</p>
                                </div>
                                <p className="text-3xl font-semibold text-primary">₹{pkg.price.toLocaleString('en-IN')}</p>
                            </CardHeader>
                            <CardFooter className="p-3 pt-3 justify-center text-xs text-muted-foreground bg-muted/50 border-t mt-4">
                                {pkg.description}
                            </CardFooter>
                        </Card>
                    )})}
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Credit Cost per Scan</h2>
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Scan Type</TableHead>
                                    <TableHead className="text-center">Credits Required</TableHead>
                                    <TableHead className="text-center">Estimated Cost</TableHead>
                                    <TableHead className="text-right">Average Duration</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bodyParts.map((part) => (
                                    <TableRow key={part.name}>
                                        <TableCell className="font-medium">{part.name}</TableCell>
                                        <TableCell className="text-center">{part.credits}</TableCell>
                                        <TableCell className="text-center">₹{part.estimatedCost}</TableCell>
                                        <TableCell className="text-right">{part.averageDuration}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </div>

            <Dialog open={!!selectedPackage} onOpenChange={(isOpen) => !isOpen && setSelectedPackage(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Complete Your Purchase</DialogTitle>
                        {selectedPackage && (
                            <DialogDescription>
                                You are purchasing {selectedPackage.credits} credits for ₹{selectedPackage.price.toLocaleString('en-IN')}.
                            </DialogDescription>
                        )}
                    </DialogHeader>
                    <Tabs defaultValue="credit-card" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="credit-card"><CreditCardIcon className="mr-2 h-4 w-4" />Card</TabsTrigger>
                            <TabsTrigger value="upi"><Landmark className="mr-2 h-4 w-4" />UPI</TabsTrigger>
                            <TabsTrigger value="qr"><QrCode className="mr-2 h-4 w-4" />QR Code</TabsTrigger>
                        </TabsList>
                        <TabsContent value="credit-card" className="pt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="card-number">Card Number</Label>
                                    <Input id="card-number" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry">Expiry</Label>
                                        <Input id="expiry" placeholder="MM/YY" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" placeholder="123" />
                                    </div>
                                </div>
                                <Button className="w-full">Pay ₹{selectedPackage?.price.toLocaleString('en-IN')}</Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="upi" className="pt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="upi-id">UPI ID</Label>
                                    <Input id="upi-id" placeholder="yourname@bank" />
                                </div>
                                <Button className="w-full">Pay ₹{selectedPackage?.price.toLocaleString('en-IN')}</Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="qr" className="pt-4 flex flex-col items-center gap-4">
                            <p className="text-sm text-muted-foreground">Scan the QR code with your UPI app</p>
                            {qrCodePlaceholder && (
                                <Image
                                    src={qrCodePlaceholder.imageUrl}
                                    alt="QR Code"
                                    width={250}
                                    height={250}
                                    className="rounded-lg"
                                    data-ai-hint={qrCodePlaceholder.imageHint}
                                />
                            )}
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SubscriptionPage;
