import React, { useEffect, useState, useRef } from "react";

interface props {
  markerPositions: number[][];
  size: number[];
}

export default function KakaoMap({ markerPositions, size }: props) {
  // const { markerPositions, size } = props;
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map>();
  const [, setMarkers] = useState<kakao.maps.Marker[]>([]);

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=d2d0a3e9baf7a60988132bbff011ca9e&autoload=false";
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
    };
  }, [container]);

  useEffect(() => {
    if (kakaoMap === null) {
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
    if (kakaoMap === null) {
      return;
    }

    const positions = markerPositions.map((pos) => {
      const [latitude, longitude] = [pos[0], pos[1]];
      // console.log(latitude, longitude);
      return new kakao.maps.LatLng(latitude, longitude);
    });

    // const positions = markerPositions.map((pos) => {
    //   console.log(...pos);
    //   return new kakao.maps.LatLng(...pos);
    // });

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
  }, [kakaoMap, markerPositions]);

  return <div id='container' ref={container} />;
}
