
"use client";

import * as React from "react";
import { Moon, Sun, Laptop, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useColorTheme } from "@/contexts/ColorThemeProvider";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitcher() {
  const { setTheme, theme: darkModeTheme, resolvedTheme } = useTheme();
  const { colorTheme, setColorTheme } = useColorTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Moved React.useMemo to be called unconditionally before the early return
  const currentModeIcon = React.useMemo(() => {
    if (!mounted) {
      // Return a default or placeholder icon if not mounted, or handle appropriately
      // For now, let's default to Sun, but this part might need adjustment based on desired initial state
      return <Sun className="h-4 w-4" />;
    }
    if (darkModeTheme === "system") {
      return resolvedTheme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />;
    }
    return darkModeTheme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />;
  }, [mounted, darkModeTheme, resolvedTheme]);

  if (!mounted) {
    return null; // Avoid rendering until mounted to prevent hydration mismatch
                 // and ensure all hooks above have been called
  }

  const handleDarkModeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleColorThemeChange = (newColorTheme: "sky" | "crimson" | "emerald") => {
    setColorTheme(newColorTheme);
  };
  

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            {currentModeIcon}
            <span className="sr-only">Toggle theme mode</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Theme Mode</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleDarkModeChange("light")}>
            <Sun className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDarkModeChange("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDarkModeChange("system")}>
            <Laptop className="mr-2 h-4 w-4" />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Palette className="h-4 w-4" />
            <span className="sr-only">Change color palette</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Color Palette</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={colorTheme} onValueChange={(value) => handleColorThemeChange(value as "sky" | "crimson" | "emerald")}>
            <DropdownMenuRadioItem value="sky">Sky (Blue)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="crimson">Crimson (Red)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="emerald">Emerald (Green)</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
