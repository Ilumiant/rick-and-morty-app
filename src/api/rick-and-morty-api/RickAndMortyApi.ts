import CharacterEndpoint from "./endpoints/CharacterEndpoint"
import EpisodeEndpoint from "./endpoints/EpisodeEndpoint"

/**
 * Creé una clase para la API y atributos para sus enpoints, para que cada clase
 * y método solo se encargue de una única cosa, respetando así el principio de
 * responsabilidad única de SOLID
 * 
 * Sé que el endpoint episode no es parte del requerimiento pero lo agregué para
 * que se viera el ejemplo de una clase de API con más de un endpoint
 */
class RickAndMortyApi {
  readonly apiUrl = 'https://rickandmortyapi.com/api'
  character : CharacterEndpoint
  episode : EpisodeEndpoint

  constructor() {
    this.character = new CharacterEndpoint(this.apiUrl)
    this.episode = new EpisodeEndpoint(this.apiUrl)
  }

}



export default RickAndMortyApi