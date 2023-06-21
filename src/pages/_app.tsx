import { type AppType } from 'next/app';
import { Analytics } from '@vercel/analytics/react';

import { api } from '~/utils/api';

import '~/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { SoundEnabledProvider } from '../context/SoundEnabledContext';
import Layout from '~/components/Layout';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <SoundEnabledProvider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </SoundEnabledProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
