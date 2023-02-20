import "@/styles/globals.css";
import type { AppProps } from "next/app";

// [x] : husky 설치
// [x] : lint-staged 설치
// [x] : emotion
// [ ] : recoil
// [ ] : react-query
// [ ] : cypress
// [ ] : mui

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
