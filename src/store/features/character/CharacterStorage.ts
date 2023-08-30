import { Character } from "../../../types/Character.interface"

class CharacterStorage {
  static key = 'characters'

  static getCharacters = () => {
    const storaged = localStorage.getItem(CharacterStorage.key)
    const characters: Character[] = storaged ? JSON.parse(storaged) : []
    return characters
  }

  static setCharacters = (characters: Character[]) => {
    localStorage.setItem(CharacterStorage.key, JSON.stringify(characters))
  }

}

export default CharacterStorage