'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, CreditCard as CreditCardIcon, Landmark, QrCode } from 'lucide-react';
import { useAppContext } from '@/hooks/use-app-context';
import { creditPackages } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const SubscriptionPage = () => {
    const { credits, subscriptionStatus } = useAppContext();
    const [selectedPackage, setSelectedPackage] = useState<(typeof creditPackages)[0] | null>(null);
    const qrCodePlaceholder = PlaceHolderImages.find(p => p.id === 'qr-code');


    return (
        <>
            <div className="flex flex-col gap-8">
                <header>
                    <h1 className="text-3xl font-bold tracking-tight">Subscription & Credits</h1>
                    <p className="text-muted-foreground mt-1">Choose a credit package that suits your needs.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Credit Packages */}
                    <div className="lg:col-span-2">
                        <div className="grid md:grid-cols-3 gap-6">
                            {creditPackages.map((pkg) => (
                                <Card key={pkg.credits} className={cn("flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-105", pkg.bestValue && "border-primary border-2 shadow-lg")}>
                                     {pkg.bestValue && <Badge className="absolute -top-3 right-3 shadow-md"><Star className="w-3 h-3 mr-1"/> Best Value</Badge>}
                                    <CardHeader className="text-center pt-8">
                                        <p className="text-5xl font-bold text-primary">{pkg.credits}</p>
                                        <CardTitle className="text-lg text-muted-foreground">Credits</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex items-center justify-center py-6">
                                       <p className="text-4xl font-semibold">₹{pkg.price.toLocaleString('en-IN')}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" size="lg" onClick={() => setSelectedPackage(pkg)}>Purchase</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Current Plan */}
                    <div className="space-y-6">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>Current Plan</CardTitle>
                                <CardDescription>Your current subscription status and credit balance.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 text-lg">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-muted-foreground">Status:</span>
                                    <Badge variant={subscriptionStatus === 'Active' ? 'default' : 'secondary'} className="text-base">{subscriptionStatus}</Badge>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-muted-foreground">Credits:</span>
                                    <span className="font-semibold text-primary">{credits}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
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
