import {atom } from  'recoil'

type playlistType = SpotifyApi.SinglePlaylistResponse;

export interface playlistData {
    playlist: playlistType | {
    images: [],
    name: string,
    folowers: object,
    id: string,
    tracks: {items: []},
    description: string,
    href: string,
    
} ;
}

export const playlistIdState = atom({
    key: "playlistIdState",
    default: "2qzxVP1ubsXjWHjmnZRklt" as string,
});

export const playlistState = atom<playlistData['playlist']>({
    key: "playlistState",
    default: {
    images: [],
    name: "",
    folowers: {},
    id: "",
    tracks: {items: []},
    description: "",
    href: "",},
})