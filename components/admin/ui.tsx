import Link from "next/link";
import { clsx } from "clsx";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}

const BADGE_COLORS = {
  amber: "bg-amber-100 text-amber-800",
  blue: "bg-blue-100 text-blue-800",
  indigo: "bg-indigo-100 text-indigo-800",
  green: "bg-emerald-100 text-emerald-800",
  gray: "bg-slate-100 text-slate-600",
  red: "bg-red-100 text-red-700",
} as const;

export function Badge({
  children,
  color = "gray",
}: {
  children: React.ReactNode;
  color?: keyof typeof BADGE_COLORS;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold",
        BADGE_COLORS[color],
      )}
    >
      {children}
    </span>
  );
}

export function AdminButton({
  href,
  children,
  variant = "primary",
  ...rest
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = clsx(
    "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-semibold no-underline transition-colors",
    variant === "primary" && "bg-slate-900 text-white hover:bg-slate-700",
    variant === "secondary" &&
      "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50",
    variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-dashed border-slate-300 rounded-lg py-16 text-center text-sm text-slate-500">
      {children}
    </div>
  );
}
