import {useState, useEffect} from 'react'
import {useSession} from 'next-auth/react'
import {ChevronDownIcon} from '@heroicons/react/solid'
import {shuffle} from 'lodash'
import {useRecoilState, useRecoilValue} from 'recoil'
import {playlistIdState, playlistState} from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'


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
        <div className="flex-grow">
            <header className='absolute top-5 right-5'>
                <div className="flex rounded-full items-center p-[2px] pr-2 bg-black text-white space-x-3 opacity-90 cursor-pointer hover:opacity-80">
                    <img src={session?.user?.image ?? ""} className='w-8 h-8 rounded-full' alt={session?.user?.name ?? ""} />
                    <h3>{session?.user?.name}</h3>
                    <ChevronDownIcon className='h-5 w-5' />
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color || "from-fuchsia-500"} text-white h-80 p-8`}>

                <img className="w-44 h-44" src={playlist?.images?.[0]?.url} alt="" />
                <div>
                    <p className="">PLAYLIST</p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-blod">{playlist?.name}</h2>
                </div>
            </section>
        </div>
    )
}

export default Center