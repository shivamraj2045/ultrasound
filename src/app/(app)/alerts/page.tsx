'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { alertsData } from '@/lib/data';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import type { Alert } from '@/lib/types';
import { Badge } from '@/components/ui/badge';


const alertConfig: Record<Alert['type'], { base: string; iconColor: string; }> = {
  Medical: {
    base: 'bg-destructive/5 border-destructive/20',
    iconColor: 'text-destructive',
  },
  System: {
    base: 'bg-amber-400/10 border-amber-400/20',
    iconColor: 'text-amber-500',
  },
  Business: {
    base: 'bg-primary/5 border-primary/20',
    iconColor: 'text-primary',
  }
};

const priorityBadges: Record<Alert['priority'], string> = {
    High: "bg-destructive/10 text-destructive hover:bg-destructive/20",
    Medium: "bg-amber-400/10 text-amber-600 hover:bg-amber-400/20",
    Low: "bg-gray-100 text-gray-600 hover:bg-gray-200"
}


const AlertActions = ({ alert }: { alert: Alert }) => {
    if (alert.title === 'Abnormal Reading Detected') {
        return (
            <div className="flex items-center gap-2">
                <Button variant="link" size="sm" className="text-primary hover:no-underline">Review</Button>
                <Button variant="link" size="sm" className="text-muted-foreground hover:no-underline">Dismiss</Button>
            </div>
        );
    }
    if (alert.title === 'Follow-up Required') {
        return (
            <div className="flex items-center gap-2">
                <Button variant="link" size="sm" className="text-primary hover:no-underline">View Patient</Button>
                <Button variant="link" size="sm" className="text-muted-foreground hover:no-underline">Dismiss</Button>
            </div>
        );
    }
    if (alert.title === 'Device Battery Low') {
        return <Button variant="link" size="sm" className="text-primary hover:no-underline">Acknowledge</Button>;
    }
    if (alert.title === 'Credits Running Low') {
        return <Button size="sm">Buy Credits</Button>;
    }
    return null;
}


const AlertsPage = () => {

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h1>
        <p className="text-muted-foreground">Stay updated with important notifications and alerts</p>
      </div>

      <div className="space-y-4">
        {alertsData.map((alert) => {
          const Icon = alert.icon;
          const config = alertConfig[alert.type];
          return (
            <div key={alert.id} className={cn('p-4 rounded-xl border flex items-start gap-4 shadow-sm', config.base)}>
              <Icon className={cn('h-6 w-6 mt-1 flex-shrink-0', config.iconColor)} />
              <div className="flex-1">
                <p className="font-semibold text-foreground">{alert.title}</p>
                <p className="text-sm text-foreground/80 mt-1">{alert.description}</p>
                <div className="text-xs text-muted-foreground mt-3 flex items-center gap-4 flex-wrap">
                  <Badge variant="outline" className={cn('font-medium', priorityBadges[alert.priority])}>
                    Priority: {alert.priority}
                  </Badge>
                  <span>{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</span>
                  <span>{alert.details}</span>
                </div>
              </div>
              <div className="ml-auto flex-shrink-0">
                 <AlertActions alert={alert}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsPage;
