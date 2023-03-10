import { PlaceResponse } from "@/types/api/place";
import Place from "./place";

interface PlaceListProps {
  placeList: PlaceResponse[];
}

const PlaceList = ({ placeList }: PlaceListProps) => {
  return (
    <>
      {(placeList || []).map((p: PlaceResponse, i: number) => (
        <Place
          key={i}
          businessName={p.businessName}
          address={p.address}
          images={p.images}
        />
      ))}
    </>
  );
};

export default PlaceList;
