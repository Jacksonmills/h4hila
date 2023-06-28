import { type AppType } from 'next/app';
import { Analytics } from '@vercel/analytics/react';

import { api } from '~/utils/api';

import '~/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { SoundEnabledProvider } from '../context/SoundEnabledContext';
import Layout from '~/components/Layout';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { baseUrl } from '~/utils/baseUrl';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <SoundEnabledProvider>
        <Layout>
          <Head>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
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
          </Head>
          <Component {...pageProps} />
          <Toaster position='bottom-center' />
          <Analytics />
        </Layout>
      </SoundEnabledProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
