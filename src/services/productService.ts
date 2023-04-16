import { http } from './config'
import { IBlouse } from '@/types'

export default {
    getBlouses: async () => {
        const response = await http.get<IBlouse[]>('/blouses')
        return response?.data
    },
    putBlouse: async (request: IBlouse) => {
        const response = await http.put<IBlouse>(`/blouses/${request.id}`, request)
        return response?.data
    }
}