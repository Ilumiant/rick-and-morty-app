import Button from '../Button'
import Styles from './Styles.module.css'

interface Props {
  title?: string
  text?: string
  isShown?: boolean
  close?: () => void
}
const Modal = ({ title = '', text = '', isShown = false, close = () => {} }: Props) => {
  return (
    <div id="defaultModal" tabIndex={-1} aria-hidden="true" className={`${Styles.container} ${isShown ? '' : 'hidden'}`}>
      <div className={Styles.modal}>
        <div className={Styles.content}>
          <div className={Styles.header}>
            <h3 className={Styles.title}>
              {title}
            </h3>
            <button type="button" className={Styles.closeModalButton}
              onClick={close}
            >
              <svg className={Styles.closeModalIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>
          <div className={Styles.body}>
            <p className={Styles.bodyText}>
              {text}
            </p>
          </div>
          <div className={Styles.footer}>
            <Button onClick={close}>Aceptar</Button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Modal