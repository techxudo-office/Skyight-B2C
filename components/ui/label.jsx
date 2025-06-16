"use client";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import * as LabelPrimitive from "@radix-ui/react-label";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
