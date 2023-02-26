import Main from "@/components/places/main";

interface Props {
  title: string;
  businessName: string;
  address: string;
}

interface ArrayProps {
  data?: Array<Props>;
}
const PlaceList = ({ data }: ArrayProps) => {
  console.log(data);
  return (
    <>
      <Main />
    </>
  );
};

export default PlaceList;

// const Container = styled.div`
//   width: 100%;
//   background-color: #fdfdfd;
// `;
//
// const TempHeader = styled.header`
//   width: 100%;
//   height: 14rem;
//   background-color: ${COLORS.mainGreen};
// `;
