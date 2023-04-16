import { http } from './config'
import { IBlusa } from '@/types'

export default {
    getBlouses: async () => {
        const response = await http.get<IBlusa[]>('/blouses')
        return response?.data
    },
    putBlouse: async (request: IBlusa) => {
        const response = await http.put<IBlusa>(`/blouses/${request.id}`, request)
        return response?.data
    }
}