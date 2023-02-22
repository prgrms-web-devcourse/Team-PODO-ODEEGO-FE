import React, { useEffect, useState, useRef } from "react";

interface props {
  markerPositions: number[][];
  size: number[];
}

// 넘어오는 markerPositions
export default function KakaoMap({ markerPositions, size }: props) {
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map>();
  const [, setMarkers] = useState<kakao.maps.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(37.50802, 127.062835);
        const options = {
          center,
          level: 3,
        };

        if (!container.current) return;
        const map = new kakao.maps.Map(container.current, options);
        //setMapCenter(center);
        setKakaoMap(map);
      });
      setIsLoading(false);
    };
  }, [container]);

  useEffect(() => {
    if (kakaoMap === null || isLoading) {
      return;
    }

    // save center position
    const center = kakaoMap?.getCenter();

    // change viewport size
    if (!container.current) return;
    const [width, height] = size;
    container.current.style.width = `${width}px`;
    container.current.style.height = `${height}px`;

    // relayout and...
    if (kakaoMap === undefined) return;
    kakaoMap.relayout();

    // restore
    if (center === undefined) return;
    kakaoMap.setCenter(center);
  }, [kakaoMap, size]);

  useEffect(() => {
    if (kakaoMap === undefined || isLoading) {
      return;
    }

    const positions = markerPositions.map((pos) => {
      const [latitude, longitude] = [pos[0], pos[1]];
      return new kakao.maps.LatLng(latitude, longitude);
    });

    setMarkers((markers) => {
      // clear prev markers
      markers.forEach((marker) => marker.setMap(null));

      // assign new markers
      return positions.map(
        (position) => new kakao.maps.Marker({ map: kakaoMap, position })
      );
    });

    if (positions.length > 0) {
      const bounds = positions.reduce(
        (bounds: any, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds()
      );

      console.log(bounds);
      if (kakaoMap === undefined) return;
      kakaoMap.setBounds(bounds);
    }

    // 지도에 표시할 선을 생성합니다
    const polyline = new kakao.maps.Polyline({
      path: positions, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: "#FFAE00", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });

    // 지도에 선을 표시합니다
    polyline.setMap(kakaoMap);
  }, [kakaoMap, markerPositions]);

  return <div id='container' ref={container} />;
}
