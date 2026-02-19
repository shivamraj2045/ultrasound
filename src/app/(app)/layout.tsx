'use client';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { AppProvider } from '@/context/AppContext';
import { useAppContext } from '@/hooks/use-app-context';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

function AppLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, setIsLoading } = useAppContext();
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      router.replace('/login');
    } else {
      setIsAuthChecked(true);
    }
  }, [router]);


  useEffect(() => {
    // When the path changes, it means navigation is complete.
    setIsLoading(false);
  }, [pathname, setIsLoading]);

  if (!isAuthChecked) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="hidden md:flex w-64" />
        <div className="flex flex-1 flex-col">
          <Navbar />
          <main className="flex-1 p-4 md:p-6 lg:p-8 relative overflow-y-auto">
            {isLoading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
              </div>
            )}
            {children}
          </main>
        </div>
      </div>
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </AppProvider>
  );
}
