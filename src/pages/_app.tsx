import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import React from "react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "../components/layout/layout";
// import Script from "next/script";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";

declare global {
  // Kakao 함수를 전역에서 사용할 수 있도록 선언
  interface Window {
    Kakao: any;
  }
}
export default function App({ Component, pageProps }: AppProps) {
  // 서로 다른 사용자 요청 사이 데이터 공유 안되게
  const [queryClient] = React.useState(() => new QueryClient());
  // function kakaoInit() {
  //   // 페이지가 로드되면 실행
  //   window.Kakao.init(process.env.NEXT_PUBLIC_LOGIN);
  //   console.log(window.Kakao.isInitialized());
  // }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            {globalStyles}
            <Layout>
              <Component {...pageProps} />
              {/* <Script
                src='https://developers.kakao.com/sdk/js/kakao.js'
                onLoad={kakaoInit}></Script> */}
            </Layout>
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}
