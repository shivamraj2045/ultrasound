'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Coins, Menu, LogOut, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppContext } from '@/hooks/use-app-context';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from './Sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const { credits, setIsLoading, doctorName, email } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    setIsLoading(true);
    sessionStorage.removeItem('isAuthenticated');
    router.push('/login');
  };
  
  const handleSettingsNavigation = () => {
    if (pathname !== '/settings') {
        setIsLoading(true);
    }
    router.push('/settings');
  }

  const getInitials = (name: string) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
        return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-4">
          <div className="md:hidden">
              <Sheet>
                  <SheetTrigger asChild>
                      <Button variant="outline" size="icon">
                          <Menu className="h-6 w-6" />
                          <span className="sr-only">Toggle navigation menu</span>
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[280px] p-0">
                      <Sidebar className="h-full w-full" isSheet />
                  </SheetContent>
              </Sheet>
          </div>
          <h1 className="text-lg font-semibold text-foreground">Ultrasound Probe</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
          <Coins className="h-4 w-4 text-primary" />
          <span>{credits} Credits</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 rounded-full px-2 py-1.5 h-auto">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground font-bold text-sm">
                  {getInitials(doctorName)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <p className="text-sm font-semibold leading-none">{doctorName}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
                <p className="font-semibold">{doctorName}</p>
                <p className="text-xs text-muted-foreground font-normal">{email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSettingsNavigation} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
