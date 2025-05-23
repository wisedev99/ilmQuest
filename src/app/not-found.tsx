
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
      <h1 className="text-5xl font-bold text-foreground mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-muted-foreground mb-6">Page Not Found</h2>
      <p className="text-foreground/80 mb-8 max-w-md">
        Sorry, the page you are looking for could not be found or may have been moved.
      </p>
      <Button asChild>
        <Link href="/">Go back to Home</Link>
      </Button>
    </div>
  );
}
