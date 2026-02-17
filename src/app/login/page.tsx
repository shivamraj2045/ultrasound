'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/icons/Logo';
import { Loader2, Copy } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('shivam.raj@example.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    sessionStorage.removeItem('isAuthenticated');
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (email === 'shivam.raj@example.com' && password === 'password123') {
        toast({
          title: 'Login Successful',
          description: 'Redirecting to your dashboard...',
        });
        sessionStorage.setItem('isAuthenticated', 'true');
        router.push('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Please check your email and password.',
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
        title: 'Copied to clipboard!',
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="mx-auto flex justify-center mb-4">
                <Logo />
            </div>
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
          <CardDescription>
            Enter your credentials to access your clinic dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
             <div className="rounded-lg border bg-muted/50 p-4 text-sm space-y-2">
                <p className="text-muted-foreground">Demo credentials:</p>
                <div className='flex items-center justify-between'>
                    <p>Email: <strong className="font-mono">shivam.raj@example.com</strong></p>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard('shivam.raj@example.com')}>
                        <Copy className="h-3 w-3" />
                    </Button>
                </div>
                <div className='flex items-center justify-between'>
                    <p>Password: <strong className="font-mono">password123</strong></p>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard('password123')}>
                        <Copy className="h-3 w-3" />
                    </Button>
                </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
