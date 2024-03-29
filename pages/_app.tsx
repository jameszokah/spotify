import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import type { AppProps } from 'next/app'
import {RecoilRoot} from  'recoil'

// @ts-ignore
function MyApp({ Component, pageProps: {session , ...pageProps} }: AppProps) {
  
  return <SessionProvider session={session}>
  <RecoilRoot>
    {/* @ts-ignore */}
    <Component {...pageProps} />
  </RecoilRoot>
  </SessionProvider> 
}

export default MyApp
