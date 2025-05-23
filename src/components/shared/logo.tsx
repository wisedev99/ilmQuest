
import Link from 'next/link';
import { Lightbulb } from 'lucide-react'; // Changed from BookHeart to Lightbulb
import { APP_NAME } from '@/lib/constants';

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
}

export function Logo({ className, iconSize = 28, textSize = "text-2xl" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      <Lightbulb size={iconSize} className="text-primary group-hover:text-accent transition-colors" /> {/* Changed icon */}
      <span className={`font-bold ${textSize} text-foreground group-hover:text-accent transition-colors`}>
        {APP_NAME}
      </span>
    </Link>
  );
}
