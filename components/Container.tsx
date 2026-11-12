import clsx, { type ClassValue } from "clsx";
import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

type ContainerProps<T extends ElementType = "div"> = PropsWithChildren<{
  as?: T;
  className?: ClassValue;
  definedBy?: "width" | "margin";
}> &
  ComponentPropsWithoutRef<T>;

export default function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  definedBy = "width",
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={clsx(className, "px-4 lg:px-6", {
        "container mx-auto": definedBy === "width",
        "mx-container w-max": definedBy === "margin",
      })}
      {...props}
    >
      {children}
    </Component>
  );
}
