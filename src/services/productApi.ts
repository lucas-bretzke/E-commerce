import { http } from './config'
import { Product } from '@/types'

export default {
  getUser: async () => {
    const response = await http.get('/user')
    return response?.data
  },

  getBaseProducts: async () => {
    const response = await http.get('/baseProducts')
    console.log({ response })
    return response?.data
  },

  getFavorites: async () => {
    const response = await http.get('/favorites')
    return response?.data
  },

  postItemInFavorites: async (req: Product) => {
    const response = await http.post('/favorites', req)
    return response?.data
  },

  deleteItemFromFavorites: async (id: number) => {
    const response = await http.delete(`/favorites/${id}`)
    return response?.data
  }
}
