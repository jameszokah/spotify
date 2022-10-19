import Head from 'next/head'
import {FC, useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import Center from '../components/center'
import {useRouter} from 'next/router'
import { ClientSafeProvider, getProviders, getSession, LiteralUnion, useSession} from 'next-auth/react'
import spotifyApi from '../lib/spotify'
import { GetServerSideProps, NextPage } from 'next'
import { Session } from 'next-auth'
import Login, { LoginProps } from './login'
import { BuiltInProviderType } from 'next-auth/providers'


interface HomeProps {
  providers: LoginProps['providers']
}
 

const Home: NextPage<HomeProps> = ({providers}) => {
    const {data: session,status} = useSession()
       const router = useRouter()

  
    useEffect(() => {
        if(session != null) {
          console.log('unauthenticated',status)
          router.push('/login')
          }
          else {
            router.replace('/')
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


export const getServerSideProps: GetServerSideProps = async () => {
  
  const providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null = await getProviders();



  return {
    props: {
      providers
    }
  }
}