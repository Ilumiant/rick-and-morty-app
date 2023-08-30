export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Origin | null
  location: Location | null
  image: string
  episodes: string[]
  url: string
  created: string
}

interface Origin {
  name: string
  url: string
}

interface Location {
  name: string
  url: string
}