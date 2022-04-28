export interface Review {
  productID: number;
  reviewID: string;
  customerName: string; //50
  customerReview: string;
  rating: number;
  email:string;
  dateAdded: Date;
}

export interface ProductGallery {
  productImageID: string;
  productImage: string;
  productImageUrl: string;
  isDefault: boolean;
}

export interface Product {
  productID: number;
  unitPrice: number;
  name: string;
  reviews: Review[];
  unitsInStock: number;
  summary: string;
  escription: string; //NULLABLE
  category: string; //NULLABLE
  brand: string; //100 //NULLABLE
  tag: string; //100 //NULLABLE
  gallery: ProductGallery[];
  isAvailable: boolean;
  dateAdded: Date;
  lastUpdateDate: Date;
  addedBy: string;
  updatedBy: string; //100
  rating: string;
}
