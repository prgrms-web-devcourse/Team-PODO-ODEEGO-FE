import Main from "@/components/places/main";
import { COLORS } from "@/constants/css";
import styled from "@emotion/styled";

const Places = () => {
  return (
    <Container>
      <TempHeader>Temp Header</TempHeader>
      <Main />
    </Container>
  );
};

export default Places;

const Container = styled.div`
  width: 100%;
  background-color: #fdfdfd;
`;

const TempHeader = styled.header`
  width: 100%;
  height: 14rem;
  background-color: ${COLORS.mainGreen};
`;
