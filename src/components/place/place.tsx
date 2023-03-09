import { COLORS } from "@/constants/css";
import styled from "@emotion/styled";
import IosShareIcon from "@mui/icons-material/IosShare";
import { PlaceResponse } from "@/types/api/place";
import PlaceImage from "./place-image";
import { IconButton } from "@mui/material";

const Place = ({ businessName, address, images }: PlaceResponse) => {
  console.log(images);
  return (
    <Container>
      <TitleIconContainer>
        <TitleContainer>
          <h3>{businessName}</h3>
          <p>{address}</p>
        </TitleContainer>
        <IconsContainer>
          <IconButton>
            <IosShareIcon
              sx={{
                display: "block",
                height: "2.5rem",
                width: "2.5rem",
                color: "#5ab27d",
              }}
            />
          </IconButton>
        </IconsContainer>
      </TitleIconContainer>
      <ImageContainer>
        {images.map((i, index) => (
          <PlaceImage
            lazy
            key={index}
            src={i.url}
            alt='place image'
            placeholder='/default-img02.jpg'
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
  margin-bottom: 1rem;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;

  & h3 {
    font-size: 1.8rem;
    font-family: bold;
    margin: 0;
    letter-spacing: -0.5px;
  }

  & p {
    font-size: 1.3rem;
    opacity: 0.7;
    margin: 0.6rem 0 0 0;
    letter-spacing: -0.5px;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  font-size: 0.8rem;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 0.5rem;

  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 1rem;
    width: 100px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: rgb(90 178 125 / 50%);
  }
`;
