'use client';

import React from 'react';
import { Coins, UserCircle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/hooks/use-app-context';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from './Sidebar'; // Re-using sidebar content for mobile

const Navbar = () => {
  const { credits } = useAppContext();

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
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserCircle className="h-6 w-6" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
