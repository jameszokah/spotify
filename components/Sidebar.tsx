import React, {useState,useEffect} from 'react';
import { HomeIcon,SearchIcon,LibraryIcon,PlusCircleIcon, HeartIcon, RssIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react';
import {useRecoilState} from 'recoil'
import {playlistIdState} from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify' 
import {useRouter} from 'next/router';

// type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;

interface playListState {
  playlist: SpotifyApi.PlaylistObjectSimplified[];
}

const Sidebar = () => {
  const [playLists, setPlayLists] = useState<playListState['playlist']>([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState) 
    const {data: session, status} = useSession()
    const {spotifyApi} = useSpotify()
    const router = useRouter()

    console.log("you just clicked on playlistId :" + playlistId)


    useEffect(() => {
      const getPlayList = async () => {
        if(spotifyApi.getAccessToken()) {
       const userPlaylist =  await spotifyApi.getUserPlaylists();
       setPlayLists(userPlaylist?.body?.items);
      
      }
      }  

      getPlayList()
    }, [session,spotifyApi])
  return <div className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 h-screen md:min-w-[11rem] lg:min-w-[12.5rem] hidden md:inline-flex overflow-y-scroll scrollbar-hide'>
      <div className='space-y-4'>
        
        <button className='flex flex-row items-center hover:text-white space-x-3'>
          <HomeIcon className="w-5 h-5" />
          <p>Home</p>
        </button>
        <button className='flex flex-row items-center hover:text-white space-x-3'>
          <SearchIcon className="w-5 h-5" />
          <p>Search</p>
        </button>
        <button className='flex flex-row items-center hover:text-white space-x-3'>
          <LibraryIcon className="w-5 h-5" />
          <p>Your Library</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />
     
        <button className='flex flex-row items-center hover:text-white space-x-3'>
          <PlusCircleIcon className="w-5 h-5" />
          <p>Create Playlist</p>
        </button>
        <button className='flex flex-row items-center hover:text-white space-x-3'>
          <HeartIcon className="w-5 h-5" />
          <p>Liked Songs</p>
        </button>
        <button className='flex flex-row items-center hover:text-white space-x-3'>
          <RssIcon className="w-5 h-5" />
          <p>Your Episodes</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />
        {playLists && playLists.map(playlist => {
          return  <p key={playlist?.id} className='cursor-pointer hover:text-white space-y-[0.4rem]' onClick={() => setPlaylistId(playlist?.id)}>{playlist?.name}</p>
        })}
       
        {/* <p className='cursor-pointer hover:text-white space-y-1'>playlist name ..</p> */}
      </div>
  </div>;
};

export default Sidebar;
