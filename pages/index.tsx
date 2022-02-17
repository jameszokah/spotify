import Head from 'next/head'
import {useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import Center from '../components/center'
import {useRouter} from 'next/router'
import { getSession} from 'next-auth/react'
import spotifyApi from '../lib/spotify'
import { GetServerSideProps } from 'next'



 

export default function Home({sessionData}) {
       const router = useRouter()
    // const {data: session, status} = sessionData
  console.log(sessionData)
    // useEffect(() => {
    //     if(status === 'unauthenticated') {
    //       console.log('unauthenticated',status)
    //       router.push('/login')
    //       }
    //     }, [session])
        
        // console.log('status :',status)
  return (
    <div className="bg-black h-screen overflow-hidden">
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


const getServerSideProps: GetServerSideProps = async (context) => {
  const sessionData = await getSession(context);

  console.log(sessionData)

  return {
    props: {
      sessionData,
    }
  }
}