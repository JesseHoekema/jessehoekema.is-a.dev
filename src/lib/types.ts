export interface TrackImage {
    size: string;
    url: string;
}

export interface TrackArtist {
    name: string;
}

export interface Track {
    name: string;
    artist: TrackArtist;
    nowplaying?: boolean;
    images: TrackImage[];
}
