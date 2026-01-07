import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#121212" />
        <link rel="manifest" href="/manifest.json" />
        {/* CSP to allow font loading */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;"
        />
        {/* Umami script commented out */}
        {/* <script
          async
          defer
          data-website-id="ed35faf2-bbd5-4786-a055-e12bab68f1d9"
          src="https://analytics.umami.is/script.js"
          data-domains="lohit.is-a.dev"
          data-do-not-track="true"
        /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
