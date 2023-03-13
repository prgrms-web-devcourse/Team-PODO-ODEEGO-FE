import { useEffect, useRef, useState } from "react";

const EVENT_LAZY_LOAD = "lazyLoadImage";

const useLazyLoadImage = (lazy = false) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy) {
      setLoaded(true);
      return;
    }

    const handleLoadImage = () => setLoaded(true);

    const imgElement = imgRef.current;
    imgElement && imgElement.addEventListener(EVENT_LAZY_LOAD, handleLoadImage);

    return () => {
      imgElement &&
        imgElement.removeEventListener(EVENT_LAZY_LOAD, handleLoadImage);
    };
  }, [lazy]);

  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      (entries, io) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            io.unobserve(entry.target);
            entry.target.dispatchEvent(new CustomEvent(EVENT_LAZY_LOAD));
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    imgRef.current && observer.observe(imgRef.current);
  }, [lazy]);

  return { loaded, imgRef };
};

export default useLazyLoadImage;
