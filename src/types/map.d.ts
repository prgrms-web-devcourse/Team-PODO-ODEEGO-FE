interface Coord {
  lat: number;
  lng: number;
}
interface useMapProps {
  mapContainerRef: RefObject<HTMLElement>;
  initialCenter: Coord;
  startPoints: BaseResponse[];
}
interface TMarker extends Coord {
  isMidpoint: boolean;
}
