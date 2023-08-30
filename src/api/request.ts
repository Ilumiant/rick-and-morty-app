import axios, { AxiosError } from 'axios'
import { errorMessages } from '../utils/messages'


interface RequestParams {
  url: string
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete',
  body?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}
/**
 * Este método es una forma de representar el patrón adapter
 * de modo que si el día de mañana axios es dejado de mantener
 * se puede reemplazar fácilmente en este archivo por otra librería
 * o por fetch, y no se tendría que ir editando todos los archivos
 * que hagan llamadas a APIs, también se puede extender agregando
 * más parámetros opcionales (como por ejemplo: headers) y no rompería
 * la implementación que tenga en otros archivos, así se cumpleel principio
 * open/close de SOLID
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export async function request({ url, method = 'get', body }: RequestParams): Promise<any> {
  try {
    const methods = {
      get: axios.get,
      post: axios.post,
      put: axios.put,
      patch: axios.patch,
      delete: axios.delete,
    }

    const response = await methods[method](url, body)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || errorMessages.internalServerError)
    }
    throw new Error(errorMessages.internalServerError)

  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
