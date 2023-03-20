import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang='ko'>
      <Head>
        <meta
          http-equiv='Content-Security-Policy'
          content='upgrade-insecure-requests'
        />
        <meta name='referrer' content='no-referrer' />
        <link rel='preconnect' href='https://dapi.kakao.com' />
        <link rel='dns-prefetch' href='https://dapi.kakao.com' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
