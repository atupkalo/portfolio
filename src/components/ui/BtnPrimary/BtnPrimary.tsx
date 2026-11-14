"use client";

import type { ComponentProps } from "react";
import "./BtnPrimary.css";

export type BtnPrimaryProps =
  | (ComponentProps<"button"> & { href?: never })
  | (ComponentProps<"a"> & { href: string });

export default function BtnPrimary(props: BtnPrimaryProps) {
  if (props.href !== undefined) {
    const { className, children, ...linkProps } = props;
    return <a {...linkProps} className={["btn-primary", className].filter(Boolean).join(" ")}>{children}</a>;
  }

  const { type = "button", className, children, ...buttonProps } = props;
  return <button {...buttonProps} type={type} className={["btn-primary", className].filter(Boolean).join(" ")}>{children}</button>;
}
