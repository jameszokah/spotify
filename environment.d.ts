declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_SPOTIFY_CLIENT_ID: string;
      NEXT_SPOTIFY_CLIENT_INEXT_SPOTIFY_CLIENT_SECRET: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
    }
  }
}