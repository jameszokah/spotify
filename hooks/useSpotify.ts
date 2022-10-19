import {useEffect, useState} from 'react'
import {useSession, signIn} from 'next-auth/react'
import spotifyApi from '../lib/spotify'
import { JWT } from 'next-auth/jwt'


interface Token extends JWT {
    accsess_token: string,
    refresh_token: string,
}

type RefreshAccessToken = typeof spotifyApi.refreshAccessToken;

const useSpotify = () => {
    const {data: session, status} = useSession();
    const [token, setToken] = useState<Token>()

    useEffect(() => {
        if(status === 'unauthenticated' && !session && !token) {
            signIn();
            console.log('unauthenticated')
        }

     (async () => {
        try {
            const res = await fetch('/api/token');
        const tokenRes = await res.json();
        setToken(tokenRes?.token);


        spotifyApi.setAccessToken(token?.accsess_token ?? "")
        spotifyApi.setRefreshToken(token?.refresh_token ?? "")

       // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
        const newToken = await spotifyApi.refreshAccessToken();

        console.log('The access token has been refreshed!');
  
      // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(newToken.body['access_token']);

   
        }
    catch(err) {
    console.log('Could not refresh access token', err);
}
     })();


    }, [session]);

    return {spotifyApi, token};
}

export default useSpotify