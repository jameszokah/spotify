import {atom} from 'recoil';

export const currentSongIdState = atom({
    key: 'currentSongIdState' as string,
    default: '' as string,
});

export const isPlayingSongState = atom({
    key: 'isPlayingSongState' as string,
    default: false as boolean,
})