import { http } from './config'
import { IBlouse } from '@/types'

export default {
    getBlouses: async () => {
        const response = await http.get<IBlouse[]>('/blouses')
        return response?.data
    },
    getBlousesById: async (id: number) => {
        const response = await http.get(`/blouses/${id}`)
        return response
    },
    putBlouse: async (request: IBlouse) => {
        const response = await http.put<IBlouse>(`/blouses/${request.id}`, request)
        return response?.data
    },

    getFavorites: async () => {
        const response = await http.get('/favorites')
        return response?.data
    },
    postItemInFavorites: async (item: any) => {
        const response = await http.post('/favorites', item)
        return response?.data
    },
}