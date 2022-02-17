
import { BuiltInProviderType } from 'next-auth/providers';
import {ClientSafeProvider, getProviders, LiteralUnion, signIn} from 'next-auth/react'

const Login = ({providers}: {providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>}) => {
  return <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-black">
      <img src='/Spotify-Logo.svg' alt='spitify logo' className='w-[25rem]' />

      {
          Object.values(providers) .map(provider => {
              return (
                  <div 
                  key={provider.id}
                  >
                        <button className='text-white py-3 px-5 border-none rounded-full hover:bg-green-600 bg-green-500' onClick={() => signIn(provider.id, {callbackUrl: '/'})}>Login with {provider.name}</button>
                  </div>
              )
          })
      }
  </div>;
};

export default Login;



export const getServerSideProps = async () => {

    const providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null = await getProviders();
    console.log(providers)
    return {
        props: {
            providers
        }
    }
}
