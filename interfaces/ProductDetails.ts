export interface  IProductDetail {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  images: string[];
  visible: boolean;
  categoryId: string;
  category: string;
  isNew: boolean;
};