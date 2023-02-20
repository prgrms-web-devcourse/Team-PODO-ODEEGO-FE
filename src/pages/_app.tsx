import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "../components/layout/layout";

export default function App({ Component, pageProps }: AppProps) {
  // 서로 다른 사용자 요청 사이 데이터 공유 안되게
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
