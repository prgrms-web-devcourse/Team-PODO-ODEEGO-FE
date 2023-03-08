interface Coord {
  lat: number;
  lng: number;
}
interface useMapProps {
  mapContainerRef: RefObject<HTMLElement>;
  initialCenter: Coord & { stationName: string };
  startPoints: BaseResponse[];
}
interface TMarker extends Coord {
  isMidpoint: boolean;
  stationName: string;
}
