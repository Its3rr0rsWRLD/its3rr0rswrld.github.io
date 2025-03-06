export interface Song {
  title: string
  artist: string
  album: string
  year: number
  genre: string
  art: string
  links: {
    apple_music?: string
    spotify?: string
    soundcloud?: string
    youtube?: string
    [key: string]: string | undefined
  }
}