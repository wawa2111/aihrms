// Minimal Next.js _document.js file
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/hrpbloom.png" />
        <meta name="description" content="HRPBloom - AI-Powered HR Management System" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}