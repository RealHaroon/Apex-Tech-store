type IconProps = { className?: string };

const stroke = "#1E2761";

export function SoftwareIcon({ className }: IconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="4" width="18" height="13" rx="2" stroke={stroke} strokeWidth="1.5" />
      <path d="M8 21h8M12 17v4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SetupIcon({ className }: IconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M9 12l2 2 4-4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.6" />
    </svg>
  );
}

export function RepairIcon({ className }: IconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="4" width="18" height="12" rx="1.5" stroke={stroke} strokeWidth="1.6" />
      <path d="M8 20h8M12 16v4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ChargerIcon({ className }: IconProps) {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="7" y="2" width="10" height="20" rx="2" stroke={stroke} strokeWidth="1.5" />
      <path d="M11 18h2" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CableIcon({ className }: IconProps) {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 12c2-4 14-4 16 0M6 12v5M18 12v5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function EarphonesIcon({ className }: IconProps) {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="6" cy="17" r="3" stroke={stroke} strokeWidth="1.5" />
      <circle cx="18" cy="17" r="3" stroke={stroke} strokeWidth="1.5" />
      <path d="M6 17V7a6 6 0 0112 0v10" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
}

export function PowerbankIcon({ className }: IconProps) {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="8" width="16" height="8" rx="2" stroke={stroke} strokeWidth="1.5" />
      <path d="M20 11v2" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MentorshipIcon({ className }: IconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3l8 4-8 4-8-4 8-4z" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6 11v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export const PRODUCT_ICONS = {
  software: SoftwareIcon,
  charger: ChargerIcon,
  cable: CableIcon,
  earphones: EarphonesIcon,
  powerbank: PowerbankIcon,
} as const;

export type ProductIconKey = keyof typeof PRODUCT_ICONS;

export function ProductIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const Icon = PRODUCT_ICONS[icon as ProductIconKey] ?? SoftwareIcon;
  return <Icon className={className} />;
}
