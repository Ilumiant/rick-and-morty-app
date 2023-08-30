import Styles from './Styles.module.css'

const Spinner = () => {
  return (
    <div className={Styles.container} role="status" >
      <span className={Styles.spinner}>
        Loading...
      </span>
    </div>
  )
}

export default Spinner