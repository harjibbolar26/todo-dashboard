"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

interface CustomProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  value?: number;
  valueBg?: string;
}

function Progress({
  className,
  value,
  valueBg,
  ...props
}: CustomProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={twMerge(
          `bg-primary h-full w-full flex-1 transition-all dark:${valueBg}`,
          valueBg
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
