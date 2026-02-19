'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import {
  Users,
  Scan,
  Coins,
  BadgeCheck,
  Plug,
  RefreshCw,
  Info,
  Loader2,
} from 'lucide-react';
import { useAppContext } from '@/hooks/use-app-context';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Line, LineChart as RechartsLineChart } from 'recharts';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const barChartData = [
  { name: 'Abdomen', scans: 40 },
  { name: 'Cardiac', scans: 30 },
  { name: 'Kidney', scans: 20 },
  { name: 'Pregnancy', scans: 27 },
  { name: 'Hand', scans: 18 },
];

const lineChartData = [
  { month: 'Jan', scans: 65 },
  { month: 'Feb', scans: 59 },
  { month: 'Mar', scans: 80 },
  { month: 'Apr', scans: 81 },
  { month: 'May', scans: 56 },
  { month: 'Jun', scans: 55 },
  { month: 'Jul', scans: 40 },
];

const DashboardPage = () => {
  const { patients, scans, credits, subscriptionStatus } = useAppContext();
  const { toast } = useToast();
  const [deviceStatus, setDeviceStatus] = useState<'Connected' | 'Disconnected' | 'Connecting'>('Disconnected');
  const [isDeviceInfoOpen, setIsDeviceInfoOpen] = useState(false);

  const handleReconnect = () => {
    setDeviceStatus('Connecting');
    toast({
      title: 'Connecting...',
      description: 'Attempting to reconnect to the device.',
    });

    setTimeout(() => {
        setDeviceStatus('Disconnected');
        toast({
            variant: "destructive",
            title: 'Connection Failed',
            description: 'We’re having trouble connecting. Please check the plugin and cable, then give it another try',
        });
    }, 2000);
  };


  const StatCard = ({ title, value, icon: Icon }: { title: string; value: string | number; icon: React.ElementType }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Patients" value={patients.length} icon={Users} />
        <StatCard title="Total Scans" value={scans.length} icon={Scan} />
        <StatCard title="Credits Remaining" value={credits} icon={Coins} />
        <StatCard title="Subscription" value={subscriptionStatus} icon={BadgeCheck} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plug className="h-5 w-5" />
            Device Connection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 rounded-lg border p-4">
            {deviceStatus === 'Connecting' ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
            ) : (
                <div className={`h-3 w-3 rounded-full ${deviceStatus === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`} />
            )}
            <div>
              <p className="font-semibold">
                {deviceStatus === 'Connecting'
                  ? 'Attempting to connect...'
                  : `Device ${deviceStatus}`}
              </p>
              <p className="text-sm text-muted-foreground">
                UltrasoundPro X1 • Serial: UPX1-2024-001
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReconnect}
            disabled={deviceStatus === 'Connecting'}
          >
            {deviceStatus === 'Connecting' ? (
              <Loader2 className="animate-spin" />
            ) : (
              <RefreshCw />
            )}
            {deviceStatus === 'Connecting' ? 'Connecting...' : 'Reconnect Device'}
          </Button>
          <Dialog open={isDeviceInfoOpen} onOpenChange={setIsDeviceInfoOpen}>
            <DialogTrigger asChild>
               <Button variant="outline" size="sm">
                <Info />
                Device Info
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Device Information</DialogTitle>
                <DialogDescription>
                  Details for your connected ultrasound device.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model</span>
                  <span className="font-semibold">UltrasoundPro X1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serial Number</span>
                  <span className="font-semibold">UPX1-2024-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Firmware</span>
                  <span className="font-semibold">v2.3.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Calibration</span>
                  <span className="font-semibold">2024-03-10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-semibold flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${deviceStatus === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`} /> {deviceStatus}
                  </span>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsDeviceInfoOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Scans by Body Part</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="scans" fill="hsl(var(--primary))" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="scans" stroke="hsl(var(--primary))" strokeWidth={2} />
                </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
