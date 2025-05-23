
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
  const iconColor = 'hsl(var(--primary))';

  if (!mounted) {
    // Return a placeholder to avoid hydration mismatch and ensure resolvedTheme is available.
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
    >
      <title>FajrulIlm Logo Icon</title>
      <desc>Icon representing FajrulIlm: an open book on a stand, with a crescent moon and rays of light above, symbolizing the dawn of knowledge.</desc>

      {/* Rehal (Book Stand) - Two crossed lines */}
      <path
        d="M30 82 L70 52 M70 82 L30 52" // X shape for the stand
        stroke={iconColor}
        strokeWidth="6" // Adjusted for visibility
        strokeLinecap="round"
        fill="none"
      />

      {/* Open Book - Simplified as a diamond shape, filled */}
      <path
        d="M20 55 L50 42 L80 55 L50 72 Z" // Diamond shape representing the open book
        fill={iconColor}
      />

      {/* Crescent Moon - Filled */}
      <path
        d="M42 27 C 42 14, 58 14, 58 27 C 50 22, 50 22, 42 27 Z" // Crescent shape
        fill={iconColor}
      />

      {/* Rays of Light - Lines with rounded caps */}
      <line x1="50" y1="18" x2="50" y2="8" stroke={iconColor} strokeWidth="4" strokeLinecap="round" /> {/* Top center ray */}
      <line x1="38" y1="22" x2="32" y2="15" stroke={iconColor} strokeWidth="4" strokeLinecap="round" /> {/* Top-left ray */}
      <line x1="62" y1="22" x2="68" y2="15" stroke={iconColor} strokeWidth="4" strokeLinecap="round" /> {/* Top-right ray */}
      <line x1="30" y1="32" x2="22" y2="28" stroke={iconColor} strokeWidth="3.5" strokeLinecap="round" /> {/* Mid-left ray */}
      <line x1="70" y1="32" x2="78" y2="28" stroke={iconColor} strokeWidth="3.5" strokeLinecap="round" /> {/* Mid-right ray */}
    </svg>
  );
}
