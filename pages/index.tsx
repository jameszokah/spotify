import Head from 'next/head'
import {FC, useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import Center from '../components/center'
import {useRouter} from 'next/router'
import { ClientSafeProvider, getProviders, getSession, LiteralUnion} from 'next-auth/react'
import spotifyApi from '../lib/spotify'
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import Login, { LoginProps } from './login'
import { BuiltInProviderType } from 'next-auth/providers'


interface HomeProps {
  sessionData:  Session;
  providers: LoginProps['providers']
}
 

const Home: FC<HomeProps> = ({sessionData,providers}) => {
       const router = useRouter()
    const session = sessionData?.data;
    const status = sessionData?.status;
  console.log(sessionData)
    useEffect(() => {
        if(status === 'unauthenticated') {
          console.log('unauthenticated',status)
          router.push('/login')
          }
        }, [session])

        if(status === 'unauthenticated') return <Login providers={providers} />
        
        console.log('status :',status)
  return (
    <div className="bg-black h-screen w-screen overflow-hidden">
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
       <Sidebar />
       {/* center */}
       <Center />
      </main>
      {/* player */}
    </div>
  )
}

export default Home;


export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessionData = await getSession(context);
  const providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null = await getProviders();

  console.log(sessionData)

  return {
    props: {
      sessionData,
      providers,
    }
  }
}