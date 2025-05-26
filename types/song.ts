export interface Song {
  title: string
  artist: string
  album: string
  year: number
  releaseDate: string // Added release date field
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
