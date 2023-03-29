import { http } from './config'
import { IBlusa } from '@/types'

export default {
    get: async () => {
        const response = await http.get<IBlusa[]>('/blusas')
        return response?.data
    },
    putBlousa: async (request: IBlusa) => {
        const response = await http.put<IBlusa>(`/blusas/${request.id}`, request)
        return response?.data
    }
}