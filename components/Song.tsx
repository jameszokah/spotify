import React, { FC } from 'react'
import useShortenTitle from '../hooks/useShortTitle';
import { millisToMinutesAndSeconds } from '../utils/useMilliConverter';
import TimeAgo from 'react-timeago';
import { useRecoilState } from 'recoil';
import { currentSongIdState, isPlayingSongState } from '../atoms/songAtom';
import spotifyApi from '../lib/spotify';


export interface songProps {
    order: number;
    track: any;
}

interface artistsList {
    type: string;
    name: string;
    href: string;
    id: string
}

const Song: FC<songProps> = ({order,track}) => {
    const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState)
    const [isPlayingSong, setIsPlayingSong] = useRecoilState(isPlayingSongState)
    const {shortTitle} = useShortenTitle()
    console.log(track)

    const artistName = (artists: artistsList[]): string => {
        return artists.map((artist: artistsList) => {
            return artist?.name
        }).join(',')
    }

    const playSong = (track: any): void => {
        setCurrentSongId(track?.track?.id);
        setIsPlayingSong(true);

        spotifyApi.play({
            uris: [track?.track?.uri],
        })
    }
  return (
    <div onClick={() => playSong(track)} className='grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 items-center gap-x-20 py-1 px-5 hover:bg-gray-900 hover:rounded-lg cursor-pointer' >
        <div className='flex items-center justify-between space-x-4 space-y-2 w-[20rem]'>
            <p className='pl-3 text-gray-500'>{order + 1}</p>
            <img className='w-[3.1rem] px-2' src={track?.track?.album?.images[0]?.url} alt="" />
            <div className='flex-1'>
                <p>{track?.track?.name}</p>
                <p className='text-gray-500 text-sm'>{shortTitle(artistName(track?.track?.artists),21,'')}</p>
            </div>
        </div>
        <div>
            <p className='text-gray-500 hidden md:inline'>{track?.track?.album?.name}</p>
        </div>
        <div>
            <p className='text-gray-500 hidden md:inline'><TimeAgo date={new Date(track?.added_at)} /></p>
        </div>

        <div >
            <p className='text-gray-500 ml-0'>{millisToMinutesAndSeconds(track?.track?.duration_ms)}</p>
        </div>

        </div>
  )
}

export default Song