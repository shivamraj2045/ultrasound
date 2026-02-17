'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Coins, UserCircle, Menu, LogOut, Settings } from 'lucide-react';
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

const Navbar = () => {
  const { credits, setIsLoading } = useAppContext();
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
                      <div className="flex h-full w-full flex-col border-r bg-card p-4">
                        <Sidebar />
                      </div>
                  </SheetContent>
              </Sheet>
          </div>
          <h1 className="text-lg font-semibold text-foreground">Ultrasound Project</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
          <Coins className="h-4 w-4 text-primary" />
          <span>{credits} Credits</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserCircle className="h-6 w-6" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSettingsNavigation} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
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
