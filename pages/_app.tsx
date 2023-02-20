import "@/styles/globals.css";
import type { AppProps } from "next/app";

// [ ] : husky 설치
// [ ] : lint-staged 설치
// [ ] : emotion
// [ ] : recoil
// [ ] : react-query
// [ ] : cypress
// [ ] : mui

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
