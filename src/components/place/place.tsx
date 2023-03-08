import { COLORS } from "@/constants/css";
import styled from "@emotion/styled";
import IosShareIcon from "@mui/icons-material/IosShare";
import { PlaceResponse } from "@/types/api/place";
import { SyntheticEvent } from "react";

const SHARE_TEXT = "공유";

const Place = ({ businessName, address, images }: PlaceResponse) => {
  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.remove();
  };

  return (
    <Container>
      <TitleIconContainer>
        <TitleContainer>
          <h3>{businessName}</h3>
          <p>{address}</p>
        </TitleContainer>
        <IconsContainer>
          <div>
            <IosShareIcon
              sx={{
                display: "block",
                height: "2.1rem",
                width: "2.1rem",
              }}
            />
            <p>{SHARE_TEXT}</p>
          </div>
        </IconsContainer>
      </TitleIconContainer>
      <ImageContainer>
        {images.length ? (
          images.map((i, index) => (
            <div key={index} onError={handleImageError}>
              <Image
                referrerPolicy='no-referrer'
                src={i.url}
                alt='place image'
              />
            </div>
          ))
        ) : (
          //TODO : 이미지가 존재하지 않는 경우의 default Image 하나만 보여주기
          <div onError={handleImageError}>
            <Image
              referrerPolicy='no-referrer'
              src='https://via.placeholder.com/200'
              alt='place image'
            />
          </div>
        )}
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
  padding-bottom: 0.5rem;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;

  & h3 {
    font-size: 1.6rem;
    font-family: bold;
    margin: 0;
  }

  & p {
    font-size: 1.3rem;
    opacity: 0.7;
    margin: 0.6rem 0 0 0;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  font-size: 0.8rem;

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & div:not(:last-of-type) {
    margin-right: 1.5rem;
  }

  & p {
    display: inline-block;
    margin-top: 0.3rem;
    opacity: 0.7;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 0.5rem;

  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 0.25rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${COLORS.mainOrange};
    border-radius: 1rem;
  }

  > div {
    flex: 0 0 auto;
    aspect-ratio: 1/1;
    overflow: hidden;
    border-radius: 1rem;
    margin-right: 0.6rem;

    &.disabled {
      display: none;
    }
  }
`;

const Image = styled.img`
  width: 12.5rem;
  height: 12.5rem;

  &.disabled {
    display: none;
  }
`;
