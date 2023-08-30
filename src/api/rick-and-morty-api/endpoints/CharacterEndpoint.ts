import { Character } from "../../../types/Character.interface"
import { request } from "../../request"

class CharacterEndpoint {
  /**
   * Si descomentas el endpoint = '/characterw' podrás ver el error
   * que proviene de la API
   */
  // readonly endpoint = '/characterw'
  readonly endpoint = '/character'
  apiUrl: string

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }

  /**
   * Este método se encarga de realizar una conversión del objeto recibido al objeto
   * usado por la aplicación, de modo que si algo cambia en la API externa la aplicación
   * no se rompería, por ejemplo, la API trae la propiedad episode, pero para la aplicación
   * la renombro como "episodes" (con S al final) ya que es un arreglo de episodios, y así
   * también se evita que las propiedades dependan de una API externa sino que dependa
   * de la aplicación
   */
  getOneCharacter = async ({ id }: { id : number}): Promise<Character> => {
    const response: CharacterResponse = await request({ url: `${this.apiUrl}${this.endpoint}/${id}` })

    return {
      id: response.id || 0,
      name: response.name || '',
      status: response.status || '',
      species: response.species || '',
      type: response.type || '',
      gender: response.gender || '',
      origin: response.origin || null,
      location: response.location || null,
      image: response.image || '',
      episodes: response.episode || [],
      url: response.url || '',
      created: response.created || (new Date()).toTimeString()
    }

  }
}


interface CharacterResponse {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Origin
  location: Location
  image: string
  episode: string[]
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

export default CharacterEndpoint
