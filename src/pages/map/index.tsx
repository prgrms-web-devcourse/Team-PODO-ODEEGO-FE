import MidpointButton from "@/components/map/midpoint-button";
import { COLORS, SHADOWS } from "@/constants/css";
import { midpointResultState } from "@/recoil/midpoint";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { ArrowBack, Close } from "@mui/icons-material";
import useMap from "@/hooks/use-map";
import { dummyData } from "@/utils/dummy-data";

const MapPage = () => {
  const result = useRecoilValue(midpointResultState);
  console.log(result);
  const [currentMidway, setCurrentMidway] = useState(0);
  const mapContainerRef = useRef(null);
  const { start, midpoints } = dummyData;
  const { map, setBoundToMidpoint } = useMap({
    mapContainerRef,
    initialCenter: { lat: midpoints[0].lat, lng: midpoints[0].lng },
    startPoints: start,
  });

  const handleNavigate = (id: string) => {
    const midpoint = midpoints.find((data) => data.id === id);
    if (!midpoint) return;
    if (!map) return;
    setBoundToMidpoint({ lat: midpoint.lat, lng: midpoint.lng }, map);
    setCurrentMidway(midpoints.indexOf(midpoint));
  };

  return (
    <Container>
      <Header>
        <ArrowBack htmlColor={COLORS.altGreen} fontSize='inherit' />
        <Close htmlColor={COLORS.altGreen} fontSize='inherit' />
      </Header>
      <Stack direction='row' spacing={4} justifyContent='center'>
        {midpoints.map((data, index) => (
          <MidpointButton
            key={data.id}
            id={data.id}
            name={data.name}
            isCurrent={currentMidway === index}
            onClick={handleNavigate}
          />
        ))}
      </Stack>
      <Map ref={mapContainerRef} id='mapContainerRef' />
    </Container>
  );
};

export default MapPage;

const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4.5rem;
  background-color: ${COLORS.backgroundSecondary};
  box-shadow: ${SHADOWS.backdropNeutral};
  margin-bottom: 2rem;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 2.4rem;
`;

const Map = styled.div`
  display: block;
  position: absolute;
  top: 4.5rem;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;
