import { useEffect, useState } from "react";

export function preloadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = img.onabort = function () {
      reject(src);
    };
    img.src = src;
  });
}

const usePreloadImage = () => {
  const [isPreloaded, setIsPreloaded] = useState<boolean>(false);
  const [imageList, setImageList] = useState<string[]>([]);

  useEffect(() => {
    async function effect() {
      if (!imageList || !imageList.length) return;
      setIsPreloaded(false);

      const imagesPromiseList: Promise<unknown>[] = [];
      for (const i of imageList) {
        imagesPromiseList.push(preloadImage(i));
      }

      try {
        await Promise.all(imagesPromiseList);
      } catch (e) {}

      setIsPreloaded(true);
    }

    effect();
  }, [imageList]);

  return { isPreloaded, setImageList };
};

export default usePreloadImage;
