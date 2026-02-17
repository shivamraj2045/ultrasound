import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { AppProvider } from '@/context/AppContext';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Navbar />
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AppProvider>
  );
}
