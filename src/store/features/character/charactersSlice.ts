import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Character } from '../../../types/Character.interface'
import RickAndMortyApi from '../../../api/rick-and-morty-api/RickAndMortyApi'
import { RootState } from '../../store'
import CharacterStorage from './CharacterStorage'
import { errorMessages } from '../../../utils/messages'

/**
 * Esta función es para simular un tiempo de espera en la request
 * y que se pueda ver el loader
 */
function waitTime(miliSeconds: number = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve('ok'), miliSeconds)
  })
}

export interface CharacterState {
  characters: Character[]
  currentCharacter: Character|null
  isLoading: boolean
  error: string|null
}

const initialState: CharacterState = {
  characters: [],
  currentCharacter: null,
  isLoading: false,
  error: null
}

/**
 * Este action carga los chracters la primera vez que se inicia la página,
 * determina si hay characters en el localstorage para hidratar el estado,
 * en caso de que no consiga datos en el localStorage hace un request para
 * traer al primer Character
 */
export const loadFirstCharacters = createAsyncThunk(
  'characters/getOne',
  async () => {
    const characters = CharacterStorage.getCharacters()
    if (characters.length) {
      return characters
    }
    const rickAndMortyApi = new RickAndMortyApi()
    const character = await rickAndMortyApi.character.getOneCharacter({ id: 1 })
    return [character]
  }
)

/**
 * Este action devuelve al siguiente charater, si no está previamente cargado,
 * cabe destacar que está función está imcompleta ya que no maneja a priori el
 * límite de characters de la API (que son 826), solo quiero aclarar que para
 * una aplicación real lo tendría en cuenta
 */
export const nextCharacter = createAsyncThunk(
  'characters/next',
  async (_, { getState }) => {
    const state = getState() as RootState
    const characters = state.characterReducer.characters
    const currentCharacter = state.characterReducer.currentCharacter
    if (currentCharacter?.id === characters.length) {
      await waitTime()
      const rickAndMortyApi = new RickAndMortyApi()
      const character = await rickAndMortyApi.character.getOneCharacter({ id: currentCharacter?.id + 1 })
      return character
    }
    
    return characters[currentCharacter!.id]
  }
)

/**
 * Este action va al character anterior, a pesar de que no ejecuta ninguna función asíncrona
 * es mejor dejarla así ya que si llega a incluír asincronía no cambiaría su firma con los
 * archivos que la importen y siga teniendo similitud con la función nextCharacter
 */
export const prevCharacter = createAsyncThunk(
  'characters/prev',
  async (_, { getState }) => {
    const state = getState() as RootState
    const characters = state.characterReducer.characters
    const currentCharacter = state.characterReducer.currentCharacter
    if (currentCharacter) {
      
      if (currentCharacter.id === 1) {
        const character = characters[characters.length - 1]
        return character
      }
  
      const character = characters.find(character => character.id === (currentCharacter.id - 1))
      if (character) {
        return character
      }
    }

    return null
    
  }
)

/**
 * Crea un Slice para manejar el estado de los characters
 */
export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    /**
     * Maneja los 3 estados principales de la función loadFirstCharacters
     * (pending, rejected, fulfilled)
     */
    builder.addCase(loadFirstCharacters.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(loadFirstCharacters.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message || errorMessages.internalServerError
    })
    builder.addCase(loadFirstCharacters.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.currentCharacter = action.payload[0]
      CharacterStorage.setCharacters(action.payload)
      state.characters = action.payload
    })

    /**
     * Maneja los 3 estados principales de la función nextCharacter
     * (pending, rejected, fulfilled)
     */
    builder.addCase(nextCharacter.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(nextCharacter.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message || errorMessages.internalServerError
    })
    builder.addCase(nextCharacter.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      const currentCharacter = action.payload
      state.currentCharacter = currentCharacter

      if (!state.characters.some(character => character.id === currentCharacter.id)) {
        const characters = [
          ...state.characters,
          currentCharacter
        ]
        CharacterStorage.setCharacters(characters)
        state.characters = characters
      }
    })

    /**
     * La función prevCharacter no tiene asincronía (como se mencionó anteriormente),
     * por eso solo maneja el estado fulfilled
     */
    builder.addCase(prevCharacter.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      const currentCharacter = action.payload
      state.currentCharacter = currentCharacter
    })
  }
})


export default charactersSlice.reducer