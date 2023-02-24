// 전체 장소 목록 컴포넌트

import React from "react";

interface Props {
  title: string;
  businessName: string;
  address: string;
}

interface ArrayProps {
  data: Array<Props>;
}

const PlaceTotalList = ({ data }: ArrayProps) => {
  return (
    <>
      {data?.map((item: any, index: number) => {
        return (
          <ul key={index}>
            <li>{item.businessName}</li>
          </ul>
        );
      })}
    </>
  );
};

export default PlaceTotalList;
