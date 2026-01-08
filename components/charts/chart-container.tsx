import * as React from "react";
import type { ResponsiveContainerProps } from "recharts";
import { ResponsiveContainer } from "recharts";

import { cn } from "@/lib/utils";

export function ChartContainer({
  className,
  ...props
}: ResponsiveContainerProps & { className?: string }) {
  return (
    <div className={cn("h-72 w-full", className)}>
      <ResponsiveContainer width="100%" height="100%" {...props} />
    </div>
  );
}
