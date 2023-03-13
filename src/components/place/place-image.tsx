import { useLazyLoadImage } from "@/hooks";
import styled from "@emotion/styled";
import Image from "next/image";
import { SyntheticEvent } from "react";

interface PlaceImageProps {
  lazy?: boolean;
  src?: string;
  alt: string;
  placeholder: string;
}

const PlaceImage = ({ lazy, src, alt, placeholder }: PlaceImageProps) => {
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
          src={
            loaded
              ? src
                ? `/api/image-fetcher?url=${encodeURIComponent(src)}`
                : placeholder
              : placeholder
          }
          alt={alt}
          width={125}
          height={125}
          style={{
            borderRadius: "1rem",
            marginRight: "0.6rem",
          }}
          priority
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
`;

// const Image = styled.img`
//   width: 12.4rem;
//   height: 12.4rem;
//   object-fit: cover;

//   &.disabled {
//     display: none;
//   }
// `;
