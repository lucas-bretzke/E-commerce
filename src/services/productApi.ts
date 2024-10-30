import { http } from './config'
import { Product } from '@/types'

export default {
  // LogarComUsuario: async () => {
  //   const response = await http.get('/user')
  //   return response?.data
  // },

  getBaseProducts: async () => {
    try {
      const response = await http.get('/baseProducts')
      return response?.data
    } catch (error) {
      console.error('Erro ao obter os produtos base:', error)
      throw error
    }
  },

  setProduct: async (id: any, updatedData: any) => {
    try {
      const response = await http.put(`/baseProducts/${id}`, updatedData)
      return response?.data
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error)
      throw error
    }
  }
}
