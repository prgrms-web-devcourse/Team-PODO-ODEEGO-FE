export interface ImageResponse {
  url: string;
}

export interface PlaceResponse {
  businessName: string;
  address: string;
  images: ImageResponse[];
}
