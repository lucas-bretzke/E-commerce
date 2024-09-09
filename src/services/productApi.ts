import { http } from './config'
import { IBlouse, IShoe } from '@/types'

export default {
    getUser: async () => {
        const response = await http.get<any>('/user')
        return response?.data
    },

    getBaseProducts: async () => {
        const response = await http.get<any>('/baseProducts')
        return response?.data
    },
    getBlouses: async () => {
        const response = await http.get<IBlouse[] | IShoe[]>('/blouses')
        return response?.data
    },
    
    putBlouse: async (req: IBlouse | IShoe) => {
        const response = await http.put<IBlouse[] | IShoe[]>(`/blouses/${req.id}`, req)
        return response?.data
    },

    getFavorites: async () => {
        const response = await http.get('/favorites')
        return response?.data
    },
    postItemInFavorites: async (req: IBlouse | IShoe) => {
        const response = await http.post('/favorites', req)
        return response?.data
    },
    deleteItemFromFavorites: async (id: number) => {
        const response = await http.delete(`/favorites/${id}`)
        return response?.data
    },
}