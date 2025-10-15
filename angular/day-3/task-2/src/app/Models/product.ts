/**
 * Interface representing the dimensions of a product.
 */
interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

/**
 * Interface representing a single customer review.
 */
interface ProductReview {
  rating: number;
  comment: string;
  date: string; // ISO 8601 string format
  reviewerName: string;
  reviewerEmail: string;
}

/**
 * Interface representing the metadata of a product.
 */
interface ProductMeta {
  createdAt: string; // ISO 8601 string format
  updatedAt: string; // ISO 8601 string format
  barcode: string;
  qrCode: string; // URL string
}

/**
 * Interface representing a single product item.
 */

export class Product {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public category: string,
    public price: number,
    public discountPercentage: number,
    public rating: number,
    public stock: number,
    public tags: string[],
    public brand: string,
    public sku: string,
    public weight: number,
    public dimensions: ProductDimensions,
    public warrantyInformation: string,
    public shippingInformation: string,
    public availabilityStatus: string,
    public reviews: ProductReview[],
    public returnPolicy: string,
    public minimumOrderQuantity: number,
    public meta: ProductMeta,
    public images: string[],
    public thumbnail: string
  ) {} // URL string){}
}
