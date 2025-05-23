
"use client"; 

import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { CustomLogoIcon } from './custom-logo-icon'; // Changed from Lightbulb

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
}

export function Logo({ className, iconSize = 28, textSize = "text-2xl" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      {/* Using the new CustomLogoIcon */}
      <CustomLogoIcon size={iconSize} className="group-hover:opacity-80 transition-opacity" />
      <span className={`font-bold ${textSize} text-foreground group-hover:text-accent transition-colors`}>
        {APP_NAME}
      </span>
    </Link>
  );
}
