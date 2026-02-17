'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  History,
  AlertTriangle,
  Video,
  CreditCard,
  Settings,
  LogOut,
  Waves,
} from 'lucide-react';
import Logo from '@/components/icons/Logo';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/hooks/use-app-context';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/ultrasound', icon: Waves, label: 'Ultrasound' },
  { href: '/patients', icon: Users, label: 'Patients' },
  { href: '/scans', icon: History, label: 'Scans' },
  { href: '/alerts', icon: AlertTriangle, label: 'Alerts' },
  { href: '/videos', icon: Video, label: 'Videos' },
  { href: '/subscription', icon: CreditCard, label: 'Subscription' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

const NavLink = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => {
  const pathname = usePathname();
  const { setIsLoading } = useAppContext();
  const isActive = pathname === href;

  const handleClick = () => {
    if (!isActive) {
      setIsLoading(true);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-accent hover:text-primary-foreground",
      isActive && "bg-primary text-primary-foreground shadow-md"
    )}>
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Sidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const { setIsLoading } = useAppContext();
  const router = useRouter();
  
  const handleHeaderClick = () => {
    if (pathname !== '/dashboard' && pathname !== '/') {
        setIsLoading(true);
    }
  };

  const handleLogout = () => {
    setIsLoading(true);
    sessionStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  return (
    <aside className={cn("flex flex-col border-r bg-card p-4", className)}>
      <Link href="/dashboard" onClick={handleHeaderClick} className="flex items-center gap-3 px-3 py-2 mb-6">
        <Logo />
        <span className="text-xl font-bold text-primary">Ultrasound Project</span>
      </Link>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
      <div className="mt-auto">
        <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-accent hover:text-primary-foreground">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
