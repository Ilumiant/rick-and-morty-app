import Layout from '../../components/global/Layout'
import CharacterDetail from '../../components/CharacterDetail'
import Slider from '../../components/global/Slider'
import useCharacter from '../../hooks/useCharacter'
import Spinner from '../../components/global/Spinner'
import CharacterErrorModal from '../../components/CharacterDetail/CharacterErrorModal'

/**
 * Verá que cada componente contiene junto con el sus estilos con CSS Module, la cual
 * es una de las formas de implementar tailwind sin ensuciar el HTML, cabe resaltar que
 * cada arquitectura de estilos tiene sus ventajas y desventajas, las ventajas de esta
 * es que un componente global puede ser empaquetado y reutilizado en otros proyectos
 * ya que trae sus porpios estilos consigo
 */
import Styles from './Styles.module.css'

/**
 * El componente Layout es una práctica muy usada para reusar un comportamiento
 * global de la aplicación, como por ejemplo el menú (aunque esta aplicación no lo posea)
 */
const HomePage = () => {
  /**
   * Custom hook para envolver los detalles de implementación de redux
   * y no exponerlos al componente de forma que sea agnóstico
   */
  const { character, nextCharacter, prevCharacter, isLoadingCharacter, error } = useCharacter()

  return (
    <>
      <Layout>
        <div>
          {character && (
            isLoadingCharacter
            ? (
              <div className={Styles.spinnerContainer}>
                <Spinner />
              </div>
            ) : (
              <Slider next={nextCharacter} prev={prevCharacter}>
                <CharacterDetail character={character} />
              </Slider>
            )
          )}
        </div>
        <CharacterErrorModal error={error} />
      </Layout>
    </>
  )
}

export default HomePage