import {useState, useEffect} from 'react'
import {useSession} from 'next-auth/react'
import {ChevronDownIcon, PlayIcon} from '@heroicons/react/solid'
import {shuffle} from 'lodash'
import {useRecoilState, useRecoilValue} from 'recoil'
import {playlistIdState, playlistState} from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from './Songs'
import { ChevronLeftIcon, ChevronRightIcon, DotsHorizontalIcon } from '@heroicons/react/outline'


interface colorState {
    color: string;
}

const colors: string[] = [
    "from-indigo-500",
    "from-fuchsia-500",
    "from-pink-500",
    "from-blue-500",
    "from-rose-500",
    "from-purple-500",
    "from-lime-500",
    "from-green-500",
    "from-zinc-500",
    "from-slate-500",
    "from-sky-500",
    "from-orange-500",
    "from-amber-500",
];



const Center = () => {
    const {data: session} = useSession()
    const [color, setColor] = useState<colorState['color']>("");
    const playlistId = useRecoilValue(playlistIdState) 
    const [playlist, setPlaylist] = useRecoilState(playlistState)
    const {spotifyApi} = useSpotify()

    useEffect(() => {
        setColor(shuffle(colors).pop() ?? "")
    }, [ playlistId]);

    useEffect(() => {
        const fetchPlayList = async () =>  {
            if(spotifyApi.getAccessToken()) {

                const playlistData = await spotifyApi.getPlaylist(playlistId);
                setPlaylist((prevPlaylist) => ({...prevPlaylist, ...playlistData.body}))
            }
         console.log(playlist)
       }

       fetchPlayList()
    },[spotifyApi, playlistId])
    
    return (
        <div className="flex-grow h-screen overflow-auto scrollbar-hide">
            <header className='relative'>
                <div className='rounded-full absolute top-5 left-0 ml-4 p-1 bg-black text-white opacity-70 cursor-pointer hover:opacity-90'>
                    <ChevronLeftIcon className='h-6 w-6'/>
                </div>
                <div className='rounded-full absolute top-5 left-10 ml-6 p-1 bg-black text-white opacity-70 cursor-pointer hover:opacity-90'>
                    <ChevronRightIcon className='h-6 w-6'/>
                </div>
                <div className="flex absolute top-5 right-5 rounded-full items-center p-[2px] pr-2 bg-black text-white space-x-3 opacity-90 cursor-pointer hover:opacity-80">
                    <img src={session?.user?.image ?? ""} className='w-8 h-8 rounded-full' alt={session?.user?.name ?? ""} />
                    <h3>{session?.user?.name}</h3>
                    <ChevronDownIcon className='h-5 w-5' />
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color || "from-fuchsia-500"} text-white h-80 p-8`}>

                <img className="w-48 h-48 shadow-xl shadow-black" src={playlist?.images?.[0]?.url} alt="" />
                <div className='space-y-3'>
                    <p className="font-medium text-sm">PLAYLIST</p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-8xl font-extrabold">{playlist?.name}</h2>

                <p className='font-bold'>{session?.user?.name ?? "" } . {playlist?.tracks.items.length >= 0 ? `${playlist?.tracks.items.length} songs` : ''}</p>
                </div>
            </section>

            <section className='space-x-4 flex items-center'>
                <button className='ml-7'>
                    
                <PlayIcon className="rounded-full w-16 h-16 z-10 fill-green-500 text-white hover:scale-105" />
                </button>
                <button>
                    <DotsHorizontalIcon className='w-7 stroke-gray-500 hover:stroke-gray-100'/>
                </button>
            </section>

            <section>
                <Songs />
            </section>
        </div>
    )
}

export default Center