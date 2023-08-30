import Styles from './Styles.module.css'

/**
 * El texto en general está escrito en hardcode, lo ideal sería usar una librería
 * que permita abstraer los textos de los componentes, como por ejemplo i18next
 */
const Header = () => {
  return (
    <div className={Styles.header}>
      <span className={Styles.title}>Rick and Morty example</span>
    </div>
  )
}

export default Header