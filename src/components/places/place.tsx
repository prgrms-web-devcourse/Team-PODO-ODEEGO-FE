import { COLORS } from "@/constants/css";
import styled from "@emotion/styled";
import Image from "next/image";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

interface PlaceProps {
  businessName: string;
}

const Place = ({ businessName }: PlaceProps) => {
  const tmpImageList = [1, 2, 3];
  return (
    <Container>
      <TitleIconContainer>
        <TitleContainer>
          <strong>{businessName}</strong>
        </TitleContainer>
        <IconContainer>
          <BookmarkBorderIcon />
          <BookmarkBorderIcon />
        </IconContainer>
      </TitleIconContainer>
      <ImageContainer>
        {tmpImageList.map((i, index) => (
          <Image
            key={index}
            src={`/cafe${index + 1}.png`}
            alt='cafe image'
            width={115}
            height={115}
            priority
          />
        ))}
      </ImageContainer>
    </Container>
  );
};

export default Place;

const Container = styled.li`
  list-style: none;
  padding: 2.1rem 1.5rem 2.5rem 1.5rem;
  background-color: ${COLORS.backgroundSecondary};
  border-bottom: 1px solid rgba(90, 178, 125, 0.3);
`;

const TitleIconContainer = styled.div`
  display: flex;
  padding-bottom: 1.5rem;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  & strong {
    font-size: 1.6rem;
    font-family: bold;
  }
`;

const IconContainer = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  overflow: auto;
  & img:not(:last-of-type) {
    margin-right: 0.6rem;
  }
`;
