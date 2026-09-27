export type CategorySummary = {
  id: string;
  name: string;
  slug: string;
};

export type ProductSummary = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: CategorySummary;
  icon: string;
  imageUrl: string | null;
  price: number;
  priceNote: string | null;
  startingPrice: boolean;
  inStock: boolean;
};
