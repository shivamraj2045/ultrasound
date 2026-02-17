'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, HardDrive, BellRing, Check } from 'lucide-radix';
import { alertsData } from '@/lib/data';
import { Button } from '@/components/ui/button';

const AlertsPage = () => {
  const medicalAlerts = alertsData.filter((a) => a.type === 'Medical');
  const systemAlerts = alertsData.filter((a) => a.type === 'System');
  const businessAlerts = alertsData.filter((a) => a.type === 'Business');

  const AlertCard = ({ title, alerts, icon: Icon }: { title: string; alerts: typeof alertsData, icon: React.ElementType }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-6 w-6 text-primary" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.length > 0 ? alerts.map((alert) => (
          <div key={alert.id} className={`p-4 rounded-lg border ${alert.read ? 'bg-card/50' : 'bg-card'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{alert.title}</p>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                <p className="text-xs text-muted-foreground/70 mt-1">{new Date(alert.timestamp).toLocaleString()}</p>
              </div>
              {!alert.read && (
                <Button variant="ghost" size="sm">
                  <Check className="h-4 w-4 mr-1" /> Mark as read
                </Button>
              )}
            </div>
          </div>
        )) : <p className="text-muted-foreground text-center py-4">No {title.toLowerCase()} alerts.</p>}
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AlertCard title="Medical Alerts" alerts={medicalAlerts} icon={AlertTriangle} />
        <AlertCard title="System Alerts" alerts={systemAlerts} icon={HardDrive} />
        <AlertCard title="Business Alerts" alerts={businessAlerts} icon={BellRing} />
      </div>
    </div>
  );
};

export default AlertsPage;
