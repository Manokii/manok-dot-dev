import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";

export const Timeline = forwardRef<HTMLUListElement, ComponentProps<"ul">>(
  function Timeline({ className, ...props }, ref) {
    return (
      <ul ref={ref} {...props} className={cn("flex flex-col", className)}></ul>
    );
  },
);

export const TimelineItem = forwardRef<HTMLLIElement, ComponentProps<"li">>(
  function TimelineItem({ className, ...props }, ref) {
    return <li ref={ref} {...props} className={cn("flex ", className)} />;
  },
);

export const TimelineSeparator = forwardRef<
  HTMLDivElement,
  ComponentProps<"div">
>(function TimelineSeparator({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "flex-shrink-1 flex-grow-0 basis-0 flex flex-col items-center",
        className,
      )}
    ></div>
  );
});

export const TimelineDot = forwardRef<HTMLSpanElement, ComponentProps<"span">>(
  function TimelineDot({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        {...props}
        className={cn(
          "rounded-full flex bg-muted-foreground self-baseline p-2",
          className,
        )}
      />
    );
  },
);

export const TimelineConnector = forwardRef<
  HTMLSpanElement,
  ComponentProps<"span">
>(function TimelineConnector({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      {...props}
      className={cn(
        "flex flex-grow box-border bg-muted-foreground w-0.5",
        className,
      )}
    />
  );
});

export const TimelineContent = forwardRef<
  HTMLDivElement,
  ComponentProps<"div">
>(function TimelineContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "basis-0 flex-grow flex-shrink box-border px-4 pb-4",
        className,
      )}
      {...props}
    />
  );
});
