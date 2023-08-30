import { ComponentPropsWithoutRef, MouseEvent } from 'react'
import Styles from './Styles.module.css'

interface Props extends ComponentPropsWithoutRef<"button"> {
  onClick?: (e : MouseEvent<HTMLButtonElement | MouseEvent>) => void
}

/**
 * Este es un ejemplo de un botón envuelto con un patrón llamado Wrapper
 * que permite invocar este botón desde toda mi aplicación y poder modificarlo
 * en un solo lugar
 */
const Button = ({ children, onClick = () => {}, ...props }: Props) => {
  return (
    <button {...props} onClick={e => onClick(e)} className={Styles.button}>
      {children}
    </button>
  )
}

export default Button