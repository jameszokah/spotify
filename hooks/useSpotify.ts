import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useSession, signIn} from 'next-auth/react'
import spotifyApi from '../lib/spotify'

const useSpotify = () => {
    const router = useRouter()
    const {data: session, status} = useSession()

    useEffect(() => {
        if(status === 'unauthenticated') {
            signIn();
            console.log('unauthenticated')
        }
        else if(session?.error === "RefreshAccessTokenError") {
            signIn();
      }

        spotifyApi.setAccessToken(typeof session?.accessToken === 'string' ? session?.accessToken : "")
        spotifyApi.setRefreshToken(typeof session?.refreshToken === "string" ? session?.refreshToken : "")

    //    spotifyApi.refreshAccessToken().then(console.log);
    }, [session])

    return {spotifyApi}
}

export default useSpotify