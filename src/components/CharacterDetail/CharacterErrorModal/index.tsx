import { useState, useEffect } from 'react'
import Modal from '../../global/Modal'

interface Props {
  error: string | null
}
const CharacterErrorModal = ({ error }: Props) => {
  
  const [showModal, setShowModal] = useState(false)
  
  function openModal() {
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
  }

  useEffect(() => {
    if (error) {
      openModal()
    }
  }, [error])

  return (
    <Modal title="No se encontró el personaje" text={error || ''} isShown={showModal} close={closeModal} />
  )
}

export default CharacterErrorModal