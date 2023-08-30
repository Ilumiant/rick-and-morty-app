import { Episode } from "../../../types/Episode.interface"
import { request } from "../../request"

class EpisodeEndpoint {
  readonly endpoint = '/episode'
  apiUrl: string

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }

  /**
   * Este método se encarga de realizar una conversión del objeto recibido al objeto
   * usado por la aplicación, de modo que si algo cambia en la API externa la aplicación
   * no se rompería, por ejemplo, la API trae la propiedad air_date (en snake_case), pero
   * para la aplicación la renombro como "airDate" (en camelCase) ya que en javascript es
   * una convención usar camelCase para los nombres de propiedades, y también se evita que
   *  las propiedades dependan de una API externa sino que dependa de la aplicación
   */
  getOneEpisode = async (): Promise<Episode> => {
    const response: EpisodeResponse = await request({ url: this.apiUrl + this.endpoint })

    return {
      id: response.id,
      name: response.name,
      airDate: response.air_date,
      episode: response.episode,
      characters: response.characters,
      url: response.url,
      created: response.created,
    }
  }
}

export interface EpisodeResponse {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export default EpisodeEndpoint