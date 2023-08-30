import { PropsWithChildren } from 'react'
import Button from '../Button'
import LeftArrowSvg from '../../icons/LeftArrowSvg'
import RightArrowSvg from '../../icons/RightArrowSvg'
import Styles from './Styles.module.css'


interface Props extends PropsWithChildren {
  next: () => void
  prev: () => void
}

/**
 * Este componente permite mostrar un Slide sin depender del children que se ingrese,
 * de modo que Slider se pueda reutilizar como una inversión de dependencias, cumpliendo así
 * la inversión de dependencias (Letra D de SOLID)
 */
const Slider = ({ children, next, prev }: Props) => {
  return (
    <div className={Styles.container}>
      { children }
      <div className={`${Styles.arrow} ${Styles.arrowLeft}`}>
        <Button onClick={() => prev()}>
          <LeftArrowSvg color='white' />
        </Button>
      </div>
      <div className={`${Styles.arrow} ${Styles.arrowRight}`}>
        <Button onClick={() => next()}>
          <RightArrowSvg color='white' />
        </Button>
      </div>
    </div>
  )
}

export default Slider