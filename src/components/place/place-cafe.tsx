// 카페 장소 목록 컴포넌트
import React from "react";

interface Props {
  title: string;
  businessName: string;
  address: string;
}

interface ArrayProps {
  data: Array<Props>;
}

const PlaceCafe = ({ data }: ArrayProps) => {
  // 강남역 , 도로명 리코일로 받기

  return (
    <>
      {data?.map((item: Props, index: number) => {
        return (
          <ul key={index}>
            <li>{item.businessName}</li>
          </ul>
        );
      })}
    </>
  );
};
export default PlaceCafe;
