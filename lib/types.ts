export type ProductSummary = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: "SOFTWARE" | "ACCESSORY";
  icon: string;
  price: number;
  priceNote: string | null;
  startingPrice: boolean;
  inStock: boolean;
};
