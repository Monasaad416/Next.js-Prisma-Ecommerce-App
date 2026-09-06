export interface IProductType {
    id: string;
    name: string;
    slug: string;
    price: number;
    stock: number;
    description: string;
    images: string[];
    categoryId: string;   
    isNew: boolean; 
    visible: boolean;
    createdAt: string;
    category: {
    id: string;
    name: string;
    slug: string;
  };
}


export interface IProducts {
    products: IProductType[];
}


export interface AddToCartBtnProps {
  product: IProductType
}