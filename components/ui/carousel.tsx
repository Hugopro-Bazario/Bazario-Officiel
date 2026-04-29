import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Carousel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none]", className)}
      {...props}
    />
  );
}
