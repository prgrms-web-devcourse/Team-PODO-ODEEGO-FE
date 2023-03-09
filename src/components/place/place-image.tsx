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

  const imageUrlLoader = ({ src }: { src: string }) => {
    //Warn: Image with src has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead
    return `${src}`;
  };

  return (
    <>
      <Container>
        <Image
          ref={imgRef}
          referrerPolicy='no-referrer'
          src={loaded ? (src ? src : placeholder) : placeholder}
          loader={imageUrlLoader}
          alt={alt}
          width={125}
          height={125}
          priority
          draggable={false}
          style={{
            borderRadius: "1rem",
            marginRight: "0.6rem",
          }}
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

// const Image = styled.img`
//   width: 12.5rem;
//   height: 12.5rem;
//   border-radius: 1rem;
//   margin-right: 0.6rem;

//   &.disabled {
//     display: none;
//   }
// `;
