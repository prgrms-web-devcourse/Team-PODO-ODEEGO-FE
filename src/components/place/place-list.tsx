import { COLORS } from "@/constants/css";
import { PlaceResponse } from "@/types/api/place";
import styled from "@emotion/styled";
import Place from "./place";

interface PlaceListProps {
  placeList: PlaceResponse[];
}

const PlaceList = ({ placeList }: PlaceListProps) => {
  return (
    <MainContainer>
      <UnOrderedList>
        {(placeList || []).map((p: PlaceResponse, i: number) => (
          <Place
            key={i}
            businessName={p.businessName}
            address={p.address}
            images={p.images}
          />
        ))}
      </UnOrderedList>
    </MainContainer>
  );
};

export default PlaceList;

const MainContainer = styled.main`
  width: 100%;
  max-height: 700px;
  height: 90vh;
  background-color: ${COLORS.backgroundSecondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: -2px 0 4px -5px #333, 2px 0 4px -5px #333;
  /* box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2); */
  user-select: none;
  padding: 3rem 0 2rem 0;
`;

const UnOrderedList = styled.ul`
  padding: 0;
  width: 100%;
  margin-top: 0;

  overflow: auto;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
