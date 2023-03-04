interface searchOriginProps {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance?: string;
  readonly id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface searchProps {
  stationName: string;
  lat: string;
  lng: string;
  address?: string;
}

export type { searchOriginProps, searchProps };
