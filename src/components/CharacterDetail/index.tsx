import { Character } from "../../types/Character.interface"
import Styles from './Styles.module.css'
import CharacterProperty from './CharacterProperty'

interface Props {
  character: Character
}

/**
 * Muestra todos los detalles de un Character
 */
const CharacterDetail = ({ character }: Props) => {
  return (
    <div className={Styles.container}>
      <img className={Styles.image} src={character.image} alt={character.name} />
      <div className={Styles.textContainer}>
        <h5 className={Styles.name}>{character.name}</h5>
        <CharacterProperty name='Status' value={character.status} />
        <CharacterProperty name='Gender' value={character.gender} />
        <CharacterProperty name='Type' value={character.type} />
        <CharacterProperty name='Species' value={character.species} />
      </div>
    </div>
  )
}

export default CharacterDetail