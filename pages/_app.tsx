import '../styles/globals.css'
import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import PaymentProvider from '../context/PaymentProvider'
import React, { useEffect } from 'react';
import WalletWrapper from '../context/utils/WalletWrapper';
import SupabaseWrapper from '../wrapper/SupabaseAuthWrapper'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SupabaseWrapper>
      <WalletWrapper>
        <PaymentProvider>
          {/* // @ts-ignore */}
            <Component {...pageProps} />
        </PaymentProvider>
      </WalletWrapper>
    </SupabaseWrapper>
  )
}
export default MyApp
