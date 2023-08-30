import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { loadFirstCharacters, nextCharacter as next, prevCharacter as prev } from "../store/features/character/charactersSlice"

/**
 * Hook que ser encarga de esconder los detalles de redux para el componente
 * externo, este hook trae de redux el character a mostrar, si está cargando
 * o si hubo un error
 */
export default function useCharacter() {
  const character = useSelector((state: RootState) => state.characterReducer.currentCharacter)
  const isLoading = useSelector((state: RootState) => state.characterReducer.isLoading)
  const error = useSelector((state: RootState) => state.characterReducer.error)
  const dispatch = useDispatch<AppDispatch>()
  
  function nextCharacter() {
    dispatch(next())
  }

  function prevCharacter() {
    dispatch(prev())
  }

  useEffect(() => {
    dispatch(loadFirstCharacters())
  }, [dispatch])

  return {
    character,
    nextCharacter,
    prevCharacter,
    isLoadingCharacter: isLoading,
    error
  }

}