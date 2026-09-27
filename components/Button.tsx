import Link from "next/link";
import { clsx } from "clsx";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";
type Size = "default" | "small";

const base =
  "inline-flex items-center gap-2 rounded-[7px] font-semibold border-[1.5px] border-transparent transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-navy-mid",
  secondary: "border-navy text-navy bg-transparent hover:bg-navy/[0.06]",
};

const sizes: Record<Size, string> = {
  default: "px-6 py-[13px] text-[0.96rem] rounded-[7px]",
  small: "px-4 py-[9px] text-[0.85rem] rounded-[6px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type LinkProps = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: LinkProps | NativeButtonProps) {
  const { variant = "primary", size = "default", className, children } = props;
  const classes = clsx(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a href={href} target={target} rel={rel} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } =
    props as NativeButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
