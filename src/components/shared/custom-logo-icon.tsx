
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

  // Use the theme's primary color for the icon in both light and dark modes.
  // This ensures it's always an accent color that contrasts with the background.
  const iconColor = 'hsl(var(--primary))';

  if (!mounted) {
    // Return a placeholder to avoid hydration mismatch and ensure resolvedTheme is available.
    // A simple div with the requested size can act as a placeholder.
    return <div style={{ width: size, height: size }} className={className} />;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100" // Using a 0-100 viewBox for easier path coordinates
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      // The 'fill' on the SVG element itself can be a default, but explicit fills/strokes on paths are more precise.
    >
      <title>FajrulIlm Logo Icon</title>
      <desc>An abstract calligraphic icon representing FajrulIlm.</desc>
      
      {/* Main flowing element - highly simplified */}
      <path 
        d="M40,85 C25,70 25,40 45,20 C55,10 65,10 70,25 C75,40 65,55 55,65 C45,75 40,85 40,85 Z M50,75 Q60,50 70,25"
        stroke={iconColor} // Use the determined iconColor for the stroke
        strokeWidth="6"
        fill="none" // This path is an outline
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dot/accent element at the top */}
      <circle cx="70" cy="22" r="5" fill={iconColor} /> {/* Use the determined iconColor for the fill */}
    </svg>
  );
}
