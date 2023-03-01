/*global kakao*/

import { BaseResponse } from "@/types/api/midpoint";
import { useState, useEffect, RefObject, useCallback } from "react";

interface useMapProps {
  mapContainerRef: RefObject<HTMLElement>;
  initialCenter: { lat: number; lng: number };
  startPoints: BaseResponse[];
}
// vercel auth test
const useMap = ({
  mapContainerRef,
  initialCenter,
  startPoints,
}: useMapProps) => {
  const [map, setMap] = useState<kakao.maps.Map>();
  const [script, setScript] = useState<HTMLScriptElement>();

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false`;
    setScript(script);
    document.head.appendChild(script);
  }, []);

  const setMarker = useCallback(
    (position: { lat: number; lng: number }) => {
      if (map) {
        const { lat, lng } = position;
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(lat, lng),
        });
        marker.setMap(map);
      }
    },
    [map]
  );

  const setCenter = (position: { lat: number; lng: number }) => {
    if (!map) return;

    const { lat, lng } = position;
    const coords = new window.kakao.maps.LatLng(lat, lng);
    map.setCenter(coords);
  };

  const setBoundToMidpoint = useCallback(
    (midpoint: { lat: number; lng: number }, map: kakao.maps.Map) => {
      if (!map) return;

      const bounds = new kakao.maps.LatLngBounds();
      startPoints.forEach(({ lat, lng }) => {
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(lat, lng),
        });
        marker.setMap(map);
        bounds.extend(new kakao.maps.LatLng(lat, lng));
      });
      // 중간지점 마커 추가
      bounds.extend(new kakao.maps.LatLng(midpoint.lat, midpoint.lng));
      setMarker(midpoint);
      map.setBounds(bounds);
    },
    [setMarker, startPoints]
  );

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
            // 시작점 기반 지도 범위 재설정
            setBoundToMidpoint(initialCenter, map);
            return map;
          }
        });
      });
    };
  }, [script, initialCenter, mapContainerRef, setBoundToMidpoint]);

  return { map, setCenter, setBoundToMidpoint, setMarker };
};

export default useMap;
