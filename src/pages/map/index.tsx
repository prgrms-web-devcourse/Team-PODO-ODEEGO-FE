import MidpointButton from "@/components/map/midpoint-button";
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import useMap from "@/hooks/use-map";
import { useRecoilValue } from "recoil";
import { MidPointState } from "@/recoil/midpoint-state";
import PlacesButton from "@/components/map/places-button";
import MapHeader from "@/components/map/map-header";
import { Stack } from "@mui/material";

const MapPage = () => {
  const [currentMidway, setCurrentMidway] = useState(0);
  const mapContainerRef = useRef(null);
  const { start, midPointResponses } = useRecoilValue(MidPointState);
  const { map, setMidpoint } = useMap({
    mapContainerRef,
    initialCenter: {
      stationName: midPointResponses[0]?.stationName,
      lat: midPointResponses[0]?.lat,
      lng: midPointResponses[0]?.lng,
    },
    startPoints: start,
  });

  const handleNavigate = (id: string) => {
    const midpoint = midPointResponses.find((data) => data.id === id);
    if (!midpoint || !map) return;
    if (midPointResponses.indexOf(midpoint) === currentMidway) return;

    setMidpoint({ lat: midpoint.lat, lng: midpoint.lng }, midpoint.stationName);
    setCurrentMidway(midPointResponses.indexOf(midpoint));
  };

  return (
    <Wrapper>
      <Container>
        <MapHeader />
        <Stack direction='row' spacing={4} justifyContent='center'>
          {midPointResponses.map((data, index) => (
            <MidpointButton
              key={data.id}
              id={data.id}
              stationName={data.stationName}
              isCurrent={currentMidway === index}
              onClick={handleNavigate}
              line={data.line}
            />
          ))}
        </Stack>
      </Container>
      <Map ref={mapContainerRef} id='mapContainerRef' />
      <PlacesButton
        stationName={midPointResponses[currentMidway]?.stationName}
      />
    </Wrapper>
  );
};

export default MapPage;

const Wrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
`;

const Map = styled.div`
  display: block;
  position: absolute;
  top: 4.5rem;
  left: 0;
  width: 100%;
  height: 100%;
`;
