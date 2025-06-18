"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Toggle } from "./ui/toggle";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
      <div className="flex items-center bg-[#1C1D220A] dark:bg-[#FFFFFF0A] rounded-[22px] w-[262px] p-1">
        <Toggle
          pressed={theme === "light"}
          onPressedChange={() => setTheme("light")}
          className="flex-1 flex items-center justify-center gap-2 h-8 data-[state=on]:bg-white dark:data-[state=on]:bg-[#FFFFFF0F] data-[state=on]:shadow-sm rounded-[18px] hover:bg-none dark:hover:bg-none cursor-pointer"
          aria-label="Light mode"
        >
          <Sun className="w-4 h-4" />
          <span className="text-sm font-semibold">Light</span>
        </Toggle>
        <Toggle
          pressed={theme === "dark"}
          onPressedChange={() => setTheme("dark")}
          className="flex-1 flex items-center justify-center gap-2 h-8 data-[state=on]:bg-white dark:data-[state=on]:bg-[#FFFFFF0F] data-[state=on]:shadow-sm rounded-[18px] cursor-pointer"
          aria-label="Dark mode"
        >
          <Moon className="w-4 h-4" />
          <span className="text-sm font-semibold">Dark</span>
        </Toggle>
    </div>
  );
}
