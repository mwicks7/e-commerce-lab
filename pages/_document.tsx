import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const siteTitle = 'Space Land'
  
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>{siteTitle}</title>
        <meta name="description" content="Learn about The United States national parks" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
