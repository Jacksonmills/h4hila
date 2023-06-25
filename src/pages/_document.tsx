import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

  return (
    <Html>
      <Head>
        <meta charSet='UTF-8' />

        <meta name='robots' content='index, follow' />
        <meta name='google' content='nositelinkssearchbox' />

        <meta
          name='description'
          content='Join the (non)sexual marketplace, make a low-value “dating profile” & enjoy perusing with fellow fupa troopers'
        />

        <meta property='og:image' content={`${baseUrl}/image/meta.png`} />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:image:width' content='512' />
        <meta property='og:image:height' content='512' />
        <meta property='og:image:alt' content='HOE4HILA Logo' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:image' content={`${baseUrl}/image/meta.png`} />
        <meta name='twitter:image:alt' content='HOE4HILA Logo' />

        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          href='/apple-touch-icon.png'
          sizes='180x180'
        />

        <meta name='theme-color' content='#7ed9f8' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
