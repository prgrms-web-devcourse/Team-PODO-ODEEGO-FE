import styled from "@emotion/styled";
import Box from "./Box";

const Paragraph = ({ line = 3, ...props }) => {
  return (
    <Container {...props}>
      <Box width='40%' height='2rem'></Box>
      <Box width='60%' height='1.3rem'></Box>
      <ImageContainer>
        {Array.from(Array(line), (_, index) =>
          index !== line - 1 ? (
            <Box key={index} width='12.4rem' height='12.4rem' />
          ) : (
            <Box key={index} width='11rem' height='12.4rem' />
          )
        )}
      </ImageContainer>
    </Container>
  );
};

export default Paragraph;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.1rem 1.5rem 2.5rem 1.5rem;
  gap: 0.6rem 0;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 0.6rem;
`;
