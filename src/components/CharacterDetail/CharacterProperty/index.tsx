import Styles from './Styles.module.css'

interface Props {
  name: string
  value: number | string
}

/**
 * Estiliza una propiedad de un personaje
 */
const CharacterProperty = ({ name, value }: Props) => {
  return (
    <p className={Styles.container}>
      <b>{name}</b>: {value}
    </p>
  )
}

export default CharacterProperty