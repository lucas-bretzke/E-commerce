import { http } from './config'
import { IBlusa } from '@/types'

export default {
    get: async () => {
        const response = await http.get<IBlusa[]>('/blusas')
        return response?.data
    }
}