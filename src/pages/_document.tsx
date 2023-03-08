import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta
          http-equiv='Content-Security-Policy'
          content='upgrade-insecure-requests'
        />
        <meta name='referrer' content='no-referrer' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
