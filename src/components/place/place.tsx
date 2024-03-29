import { COLORS } from "@/constants/css";
import styled from "@emotion/styled";
import IosShareIcon from "@mui/icons-material/IosShare";
import { ImageResponse, PlaceResponse } from "@/types/api/place";
import PlaceImage from "./place-image";
import { IconButton } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const Place = ({ businessName, address, images, shareUrl }: PlaceResponse) => {
  const [filteredImages, setFilteredImages] = useState<ImageResponse[]>([]);

  useEffect(() => {
    //NET: ERR_CERT_INVALID_NAME 막기 위한 http url 거르기
    const imageArr = images.filter((i) => i.url.indexOf("http://") === -1);

    setFilteredImages(imageArr);
  }, [images]);

  const handleClickShareClipboard = async (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    await navigator.clipboard.writeText(`${shareUrl}`);
    toast.success("복사 완료", {
      style: {
        border: "1px solid #5AB27D",
        color: "#464646",
        fontWeight: "bold",
        backgroundColor: "#FDFDFD",
      },
      iconTheme: {
        primary: "#5AB27D",
        secondary: "#FFFAEE",
      },
    });
  };

  return (
    <Container>
      <Toaster />
      <TitleIconContainer>
        <TitleContainer>
          <h3>{businessName}</h3>
          <p>{address}</p>
        </TitleContainer>
        <IconsContainer>
          <IconButton
            sx={{ padding: "0.5rem" }}
            onClick={handleClickShareClipboard}
            aria-label='share button'>
            <IosShareIcon
              sx={{
                display: "block",
                height: "2rem",
                width: "2rem",
                color: "#5ab27d",
              }}
            />
          </IconButton>
        </IconsContainer>
      </TitleIconContainer>
      <ImageContainer>
        {filteredImages.map((i, index) => (
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
`;

const TitleIconContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #000000;

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
  gap: 0.6rem;

  &::-webkit-scrollbar {
    height: 1rem;
    width: 100px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: rgb(90 178 125 / 50%);
  }
`;
