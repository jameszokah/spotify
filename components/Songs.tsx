import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Song, { songProps } from './Song'
import {ClockIcon} from '@heroicons/react/outline'

const Songs = () => {  
    const playlist = useRecoilValue(playlistState) 


  return (
    <div className='text-white space-x-6'>
        <div className="grid lg:grid-cols-4 md:grid-cols-4 gap-x-20 grid-cols-2 items-center mx-5 uppercase text-sm text-gray-600 border-b border-gray-900 pb-4 mb-3">
            <p className='ml-4'>  <span className='pr-3 text-lg'>#</span> title</p>
            <p className='hidden md:inline'>Album</p>
            <p className='hidden md:inline'>Date Added</p>
            <p><ClockIcon className='w-5 h-5' /></p>
        </div>
        {
            playlist?.tracks?.items.map((track: songProps['track'], i: songProps['order']) => {
                return <>
                    {
                       <Song key={ track?.track?.id} track={track} order={i} />
                    }
                </>
            })
        }
    </div>
  )
}

export default Songs