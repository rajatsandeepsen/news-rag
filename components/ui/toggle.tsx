"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        success: "data-[state=on]:bg-gradient-to-tr transition-colors from-pink-400 to-orange-200 dark:bg-secondary dark:text-secondary-foreground bg-primary text-primary-foreground hover:bg-primary/90 data-[state=on]:text-background",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants> & {radio?:boolean}
>(({ className, children, radio = false, variant, size, ...props }, ref) => {
  const [checked, setChecked] = React.useState<boolean>()
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
      onPressedChange={(e) => {
        radio && setChecked(e)
        typeof props?.onPressedChange === "function" ? props?.onPressedChange(e) : void 0
      }}
    >
      {children}
      {radio && <input className="hidden" name={props.name} type="radio" checked={checked} />}
    </TogglePrimitive.Root>
  )
}
)
Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
