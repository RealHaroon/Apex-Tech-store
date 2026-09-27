import { ProductIcon } from "@/components/icons";

export function ProductThumb({
  imageUrl,
  icon,
  name,
  className = "h-[120px]",
  iconClassName,
}: {
  imageUrl: string | null;
  icon: string;
  name: string;
  className?: string;
  iconClassName?: string;
}) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- admin-supplied URLs (local or remote), unpredictable at build time
      <img
        src={imageUrl}
        alt={name}
        className={`${className} w-full object-cover bg-ice`}
      />
    );
  }
  return (
    <div className={`${className} bg-ice flex items-center justify-center`}>
      <ProductIcon icon={icon} className={iconClassName} />
    </div>
  );
}
