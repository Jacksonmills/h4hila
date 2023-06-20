import { type AppType } from "next/app";
import { Analytics } from '@vercel/analytics/react';

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SoundEnabledProvider } from "./SoundEnabledContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <SoundEnabledProvider>
        <Component {...pageProps} />
        <Analytics />
      </SoundEnabledProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
