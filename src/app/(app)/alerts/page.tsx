'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { alertsData } from '@/lib/data';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import type { Alert } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/hooks/use-app-context';
import { useRouter, usePathname } from 'next/navigation';
import { BellOff } from 'lucide-react';


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


const AlertsPage = () => {
    const { credits, setIsLoading } = useAppContext();
    const router = useRouter();
    const pathname = usePathname();
    
    const [alerts, setAlerts] = useState<Alert[]>(alertsData);

    useEffect(() => {
        setAlerts(currentAlerts => currentAlerts.map(alert => {
            if (alert.id === 'a003') { // "Credits Running Low" alert
              return {
                ...alert,
                description: `Only ${credits} credits remaining. Consider purchasing more credits to continue uninterrupted service.`,
                details: `Balance: ${credits} credits`,
              };
            }
            return alert;
        }));
    }, [credits]);


    const handleDismiss = (alertId: string) => {
        setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
    };
    
    const handleNavigation = (path: string) => {
        if (pathname !== path) {
            setIsLoading(true);
        }
        router.push(path);
    }

    const AlertActions = ({ alert }: { alert: Alert }) => {
        if (alert.title === 'Abnormal Reading Detected') {
            return (
                <div className="flex items-center gap-2">
                    <Button variant="link" size="sm" className="text-primary hover:no-underline" onClick={() => handleNavigation('/patients')}>Review</Button>
                    <Button variant="link" size="sm" className="text-muted-foreground hover:no-underline" onClick={() => handleDismiss(alert.id)}>Dismiss</Button>
                </div>
            );
        }
        if (alert.title === 'Follow-up Required') {
            return (
                <div className="flex items-center gap-2">
                    <Button variant="link" size="sm" className="text-primary hover:no-underline" onClick={() => handleNavigation('/patients')}>View Patient</Button>
                    <Button variant="link" size="sm" className="text-muted-foreground hover:no-underline" onClick={() => handleDismiss(alert.id)}>Dismiss</Button>
                </div>
            );
        }
        if (alert.title === 'Device Battery Low') {
            return <Button variant="link" size="sm" className="text-primary hover:no-underline" onClick={() => handleDismiss(alert.id)}>Acknowledge</Button>;
        }
        if (alert.title === 'Credits Running Low') {
            return <Button size="sm" onClick={() => handleNavigation('/subscription')}>Buy Credits</Button>;
        }
        return null;
    }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h1>
        <p className="text-muted-foreground">Stay updated with important notifications and alerts</p>
      </div>

      <div className="space-y-4">
        {alerts.length > 0 ? alerts.map((alert) => {
          const Icon = alert.icon;
          const config = alertConfig[alert.type];
          return (
            <div key={alert.id} className={cn('p-4 rounded-xl border flex flex-col sm:flex-row items-start gap-4 shadow-sm', config.base)}>
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
              <div className="ml-auto sm:ml-4 mt-2 sm:mt-0 flex-shrink-0 self-start sm:self-center">
                 <AlertActions alert={alert}/>
              </div>
            </div>
          );
        }) : (
            <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-lg border-2 border-dashed">
                <BellOff className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">All caught up!</h3>
                <p className="text-muted-foreground text-sm">You have no new notifications.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;
