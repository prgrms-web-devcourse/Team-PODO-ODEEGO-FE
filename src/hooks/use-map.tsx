import { useState, useEffect, useCallback } from "react";

const useMap = ({
  mapContainerRef,
  initialCenter,
  startPoints,
}: useMapProps) => {
  const [map, setMap] = useState<kakao.maps.Map>();
  const [script, setScript] = useState<HTMLScriptElement>();
  const [markerPositions, setMarkerPositions] = useState<TMarker[]>(() => {
    const starts = startPoints.map((v) => ({
      lat: v.lat,
      lng: v.lng,
      isMidpoint: false,
    }));
    return [{ ...initialCenter, isMidpoint: true }, ...starts];
  });
  const [, setMarkers] = useState<kakao.maps.Marker[]>();

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false`;
    setScript(script);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!script) return;

    script.onload = () => {
      kakao.maps.load(() => {
        const { lat, lng } = initialCenter;
        setMap(() => {
          if (mapContainerRef.current) {
            //지도 만들기
            const map = new kakao.maps.Map(mapContainerRef.current, {
              center: new kakao.maps.LatLng(lat, lng),
              level: 4,
            });
            return map;
          }
        });
      });
    };
  }, [script, initialCenter, mapContainerRef]);

  const setBounds = useCallback(() => {
    if (!map) return;

    const bounds = new kakao.maps.LatLngBounds();
    markerPositions.forEach(({ lat, lng }) =>
      bounds.extend(new kakao.maps.LatLng(lat, lng))
    );
    map.setBounds(bounds);
  }, [map, markerPositions]);

  const setMidpoint = (coord: Coord) => {
    const nextMarkerPositions = markerPositions.map((pos) => {
      if (pos.isMidpoint) {
        return {
          lat: coord.lat,
          lng: coord.lng,
          isMidpoint: true,
        };
      }
      return pos;
    });
    setMarkerPositions(nextMarkerPositions);
  };

  useEffect(() => {
    if (!map) return;

    // markerPositions가 바뀌면 새로운 카카오 마커 생성
    const nextMarkers = markerPositions.map(
      (pos) =>
        new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(pos.lat, pos.lng),
        })
    );

    setMarkers((markers) => {
      markers?.forEach((marker) => marker.setMap(null)); // 기존에 있던 마커 모두 제거
      return nextMarkers;
    });

    setBounds(); // 지도 범위 재설정
  }, [map, markerPositions, setBounds]);

  return { map, setBounds, setMidpoint };
};

export default useMap;
