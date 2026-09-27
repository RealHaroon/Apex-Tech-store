import { clsx } from "clsx";

export function EyebrowTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[0.85rem] text-navy-mid bg-navy/[0.07] px-3.5 py-1.5 rounded-full font-semibold">
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  description,
  center,
  light,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={clsx("max-w-[58ch] mb-12", center && "mx-auto text-center")}>
      {eyebrow && <div className="mb-4"><EyebrowTag>{eyebrow}</EyebrowTag></div>}
      <h2 className={clsx("text-[clamp(1.5rem,3vw,2.1rem)] font-semibold", light && "text-white")}>
        {title}
      </h2>
      {description && (
        <p className={clsx("mt-3 text-[1.02rem]", light ? "text-[#B9C2E8]" : "text-muted")}>
          {description}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="pt-16 pb-14 bg-gradient-to-b from-ice to-white border-b border-line">
      <div className="max-w-wrap mx-auto px-7">
        <div className="mb-4"><EyebrowTag>{eyebrow}</EyebrowTag></div>
        <h1 className="text-[clamp(1.9rem,4vw,2.6rem)] font-semibold max-w-[20ch]">{title}</h1>
        {description && <p className="mt-3.5 text-muted text-[1.05rem] max-w-[52ch]">{description}</p>}
      </div>
    </div>
  );
}
