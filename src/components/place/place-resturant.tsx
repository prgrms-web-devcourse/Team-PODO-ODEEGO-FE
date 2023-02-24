import React from "react";

interface Props {
  title: string;
  businessName: string;
  address: string;
}

interface ArrayProps {
  data: Array<Props>;
}

const PlaceResturant = ({ data }: ArrayProps) => {
  console.log(data);

  return (
    <>
      {data.map((item: Props, index: number) => {
        return (
          <ul key={index}>
            <li>{item.businessName}</li>
          </ul>
        );
      })}
    </>
  );
};
export default PlaceResturant;
