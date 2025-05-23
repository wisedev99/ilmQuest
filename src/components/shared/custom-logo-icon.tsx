
"use client";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface CustomLogoIconProps {
  size?: number;
  className?: string;
}

export function CustomLogoIcon({ size = 28, className }: CustomLogoIconProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder to avoid hydration mismatch and ensure resolvedTheme is available.
    // A simple div with the requested size can act as a placeholder.
    return <div style={{ width: size, height: size }} className={className} />;
  }

  // Determine color based on theme.
  // Using CSS variables for theme consistency is better if possible,
  // but for direct SVG fill, explicit color values are straightforward here.
  const iconColor = resolvedTheme === 'dark' ? 'hsl(var(--primary-foreground))' : 'hsl(var(--primary))';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100" // Using a 0-100 viewBox for easier path coordinates
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      fill={iconColor} // Apply color to the whole SVG, paths can inherit or override
    >
      <title>FajrulIlm Logo Icon</title>
      <desc>An abstract calligraphic icon representing FajrulIlm.</desc>
      {/* This is a simplified abstract SVG. For a true representation of complex calligraphy, 
          an externally created SVG file placed in the /public directory and used via an <Image> tag would be more accurate. */}
      
      {/* Main flowing element - highly simplified */}
      <path 
        d="M40,85 C25,70 25,40 45,20 C55,10 65,10 70,25 C75,40 65,55 55,65 C45,75 40,85 40,85 Z M50,75 Q60,50 70,25"
        stroke={iconColor}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dot/accent element at the top */}
      <circle cx="70" cy="22" r="5" fill={iconColor} />
    </svg>
  );
}
