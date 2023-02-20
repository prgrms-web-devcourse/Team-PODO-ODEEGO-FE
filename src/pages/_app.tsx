import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// [x] : husky 설치
// [x] : lint-staged 설치
// [x] : styled
// [x] : recoil
// [x] : react-query
// [x] : mui
// [ ] : cypress

////////////////////////////////////////////////////////////

export default function App({ Component, pageProps }: AppProps) {
  // 서로 다른 사용자 요청 사이 데이터 공유 안되게
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Component {...pageProps} />;
      </RecoilRoot>
    </QueryClientProvider>
  );
}
