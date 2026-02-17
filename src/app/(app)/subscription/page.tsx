'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star } from 'lucide-react';
import { useAppContext } from '@/hooks/use-app-context';
import { creditPackages, bodyParts } from '@/lib/data';
import { cn } from '@/lib/utils';

const SubscriptionPage = () => {
    const { credits, subscriptionStatus } = useAppContext();

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold tracking-tight">Subscription & Credits</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Buy Credits</CardTitle>
                            <CardDescription>Purchase credits to perform ultrasound scans. Choose a package that suits your needs.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-3 gap-6">
                            {creditPackages.map((pkg) => (
                                <Card key={pkg.credits} className={cn("flex flex-col", pkg.bestValue && "border-primary border-2")}>
                                     {pkg.bestValue && <Badge className="absolute -top-3 right-3"><Star className="w-3 h-3 mr-1"/> Best Value</Badge>}
                                    <CardHeader className="text-center">
                                        <CardTitle className="text-4xl font-bold">{pkg.credits}</CardTitle>
                                        <p className="text-muted-foreground">Credits</p>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex items-center justify-center">
                                       <p className="text-3xl font-semibold">₹{pkg.price.toLocaleString('en-IN')}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">Purchase</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Plan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-baseline">
                                <span className="text-muted-foreground">Status:</span>
                                <span className="font-semibold text-lg">{subscriptionStatus}</span>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <span className="text-muted-foreground">Credits:</span>
                                <span className="font-semibold text-lg">{credits}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Credit Cost Reference</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Body Part</TableHead>
                                        <TableHead className="text-right">Cost</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bodyParts.map((part) => (
                                        <TableRow key={part.name}>
                                            <TableCell>{part.name}</TableCell>
                                            <TableCell className="text-right">{part.credits} credits</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;
