"use client";

import type { ComponentProps } from "react";
import "./BtnSecondary.css";

export type BtnSecondaryProps =
  | (ComponentProps<"button"> & { href?: never })
  | (ComponentProps<"a"> & { href: string });

export default function BtnSecondary(props: BtnSecondaryProps) {
  if (props.href !== undefined) {
    const { className, children, ...linkProps } = props;
    return <a {...linkProps} className={["btn-secondary", className].filter(Boolean).join(" ")}>{children}</a>;
  }

  const { type = "button", className, children, ...buttonProps } = props;
  return <button {...buttonProps} type={type} className={["btn-secondary", className].filter(Boolean).join(" ")}>{children}</button>;
}
