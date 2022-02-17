import SpotifyWebApi from 'spotify-web-api-node';


const scopes: string = [
    "user-read-playback-state",
    "ugc-image-upload",
    "user-modify-playback-state",
    "user-read-private",
    "user-follow-modify",
    "user-follow-read",
    // "user-library-modify",
    "user-library-read",
    "streaming",
    "user-read-playback-position",
    "playlist-modify-private",
    "playlist-read-collaborative",
    "app-remote-control",
    "user-read-email",
    "playlist-read-private",
    "user-top-read",
    "playlist-modify-public",
    "user-read-currently-playing",
    "user-read-recently-played"
].join(",");

const params = {
    scope: scopes
}

let queryParam: URLSearchParams = new URLSearchParams(params)

export const LOGIN_URL = `https://accounts.spotify.com/authorize?response_type=code&${queryParam.toString()}`;

const spotifyApi = new SpotifyWebApi({
        clientId: process.env.NEXT_SPOTIFY_CLIENT_ID,
        clientSecret: process.env.NEXT_SPOTIFY_CLIENT_SECRET,
})

export default spotifyApi