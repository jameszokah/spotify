import NextAuth, { Account } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';



const refreshAccessToken = async (token: JWT,account: Account | null | undefined) : Promise<JWT> => {
   try {
       spotifyApi.setAccessToken(account?.access_token ?? "");
       spotifyApi.setRefreshToken(account?.refresh_token ?? "");

       const { body: refreshToken} = await spotifyApi.refreshAccessToken();
       console.log("REFRESHED ACCES TOKEN", refreshToken)

       return {
           ...token,
           ...account,
           accessToken: refreshToken.access_token,
           refreshTokenExpires: Date.now() + refreshToken.expires_in * 1000, // = 1hr as 3600 returned from spotify api 
           refreshToken: refreshToken.access_token ?? (typeof token.refreshToken === "string" ? token.refreshToken : ""),
       }
   }
   catch(err) {
       console.log(err)
        
       return {
           ...token,
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
                    ...account,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: Date.now() + (account.expires_at ?? 1) * 1000,
                    
                }
            }
            if((typeof account?.expires_at === "number") && (Date.now() <  (Date.now() + (account.expires_at ?? 1) * 1000))) {
                console.log("ACCESS TOKEN STILL HASN'T EXPIRE YET")
                 return {
                    ...token,
                    ...account
                    // error: "RefreshAccessTokenError",

                 };
        
            }

      // Access token has expired, try to update it
        console.log("ACCES TOKEN HAS EXPIRED, REFRESHING")
      return await refreshAccessToken(token,account)
        },
        async session({session, token, user}) {



      return {
          ...session,
          user: {
              ...session.user,
              ...user,
          },
          accessToken: token.accessToken,
          refreshToken: token.refreshToken
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