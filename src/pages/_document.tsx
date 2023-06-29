import { Html, Head, Main, NextScript } from 'next/document';
import { baseUrl } from '~/utils/baseUrl';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet='UTF-8' />

        <meta name='robots' content='index, follow' />
        <meta name='google' content='nositelinkssearchbox' />

        <meta
          name='description'
          content='Hit up HOE4HILA, our meme-filled, (non)sexual marketplace, only for the 18+ crowd. Craft your "dating" profile and enjoy the swipe life on our unofficial H3 dating app, together with fellow fupa troopers and steadfast foot soldiers. This place is about the memes, not the matches!'
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

        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#2563eb' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
