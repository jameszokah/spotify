import NextAuth, { Awaitable } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';



const refreshAccessToken = async (token: JWT) : Promise<JWT> => {
   try {
       spotifyApi.setAccessToken(typeof token.accessToken === "string" ? token.accessToken : "")
       spotifyApi.setRefreshToken(typeof token.refreshToken === "string" ? token.refreshToken : "")

       const { body: refreshToken } = await spotifyApi.refreshAccessToken();
       console.log("REFRESHED ACCES TOKEN", refreshToken)

       return {
           ...token,
           accessToken: refreshToken.access_token,
           refreshTokenExpires: Date.now() + refreshToken.expires_in * 1000, // = 1hr as 3600 returned from spotify api 
           refreshToken: refreshToken.access_token ?? (typeof token.refreshToken === "string" ? token.refreshToken : ""),
       }
   }
   catch(err) {
       console.log(err)
        
       return {
           ...token,
           error: "RefreshAccessTokenError",
       }
   }
   
}

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_SPOTIFY_CLIENT_ID ?? "",
            clientSecret: process.env.NEXT_SPOTIFY_CLIENT_SECRET  ?? "",
            authorization: LOGIN_URL, 

        }),
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
       async jwt({token,account,user}) {

            console.log("token jwt: ",token)
            console.log("account jwt: ",account)
            console.log("user jwt: ",user)

            if(account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: (account.expires_at ?? 1) * 1000,
                    
                }
            }
            if((typeof token?.accessTokenExpires === "number") && (Date.now() <  token?.accessTokenExpires)) {
                console.log("ACCESS TOKEN STILL HASN'T EXPIRE YET")
                 return token;
        
            }

      // Access token has expired, try to update it
        console.log("ACCES TOKEN HAS EXPIRED, REFRESHING")
      return await refreshAccessToken(token)
        },
        async session({session, token}) {



      return {
          ...session,
          error: token.error,
          user: {
              ...session.user,
          },
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
      }
        },
    },
    pages: {
        signIn: "/login"
    },
//      cookies: {
//     csrfToken: {
//       name: 'next-auth.csrf-token',
//       options: {
//         httpOnly: true,
//         sameSite: 'none',
//         path: '/',
//         secure: true
//       }
//     },
//     pkceCodeVerifier: {
//       name: 'next-auth.pkce.code_verifier',
//       options: {
//         httpOnly: true,
//         sameSite: 'none',
//         path: '/',
//         secure: true
//       }
//     }
//   },
    debug: true,

});