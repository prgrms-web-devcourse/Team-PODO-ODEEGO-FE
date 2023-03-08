import { useLazyLoadImage } from "@/hooks";
import styled from "@emotion/styled";
import { SyntheticEvent } from "react";

interface PlaceImageProps {
  lazy?: boolean;
  src?: string;
  alt: string;
  placeholder: string;
}

const PlaceImage = ({
  lazy = false,
  src,
  alt,
  placeholder,
}: PlaceImageProps) => {
  const { loaded, imgRef } = useLazyLoadImage(lazy);

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.remove();
  };
  return (
    <>
      <Container>
        <Image
          ref={imgRef}
          referrerPolicy='no-referrer'
          src={loaded ? (src ? src : placeholder) : placeholder}
          alt={alt}
          onError={handleImageError}
        />
      </Container>
    </>
  );
};

export default PlaceImage;

const Container = styled.div`
  flex: 0 0 auto;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 1rem;
  /* margin-right: 0.6rem; */
`;

const Image = styled.img`
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 1rem;
  margin-right: 0.6rem;

  &.disabled {
    display: none;
  }
`;
