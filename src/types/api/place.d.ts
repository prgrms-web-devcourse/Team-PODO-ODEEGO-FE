export interface ImageResponse {
  url: string;
}

export interface PlaceResponse {
  businessName: string;
  address: string;
  images: ImageResponse[];
  shareUrl: string;
}

export interface PlaceListResponse {
  content: PlaceResponse[];
  last: boolean;
}
