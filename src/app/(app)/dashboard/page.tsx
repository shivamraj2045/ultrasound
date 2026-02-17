'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, LineChart } from 'lucide-react';
import { useAppContext } from '@/hooks/use-app-context';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Line, LineChart as RechartsLineChart } from 'recharts';

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
        <StatCard title="Total Patients" value={patients.length} icon={UsersIcon} />
        <StatCard title="Total Scans" value={scans.length} icon={ScanIcon} />
        <StatCard title="Credits Remaining" value={credits} icon={CoinsIcon} />
        <StatCard title="Subscription" value={subscriptionStatus} icon={BadgeCheckIcon} />
      </div>

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

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function ScanIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M7 12a5 5 0 0 1 5-5" />
      <path d="M12 17a5 5 0 0 0 5-5" />
    </svg>
  )
}

function CoinsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  )
}

function BadgeCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.78l1.21 1.22a1 1 0 0 0 1.42 0l1.21-1.22a4 4 0 0 1 4.78 4.78l-1.22 1.21a1 1 0 0 0 0 1.42l1.22 1.21a4 4 0 0 1-4.78 4.78l-1.21-1.22a1 1 0 0 0-1.42 0l-1.21 1.22a4 4 0 0 1-4.78-4.78l1.22-1.21a1 1 0 0 0 0-1.42z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export default DashboardPage;
