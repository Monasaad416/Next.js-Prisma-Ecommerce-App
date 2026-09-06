export interface ICategoryType {
    id: string;
    name: string;
    slug: string;
    image: string;
    isNew?: boolean;
    isTopCategory?:boolean
    visible?:boolean  ;
}

export interface CategoriesGridProps {
  categories: ICategoryType[];
  onClick?: () => void;
}