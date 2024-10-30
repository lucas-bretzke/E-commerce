import { http } from './config'
import { Product } from '@/types'

export default {
  // LogarComUsuario: async () => {
  //   const response = await http.get('/user')
  //   return response?.data
  // },

  getBaseProducts: async () => {
    const response = await http.get('/baseProducts')
    return response?.data
  }
}
