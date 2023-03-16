import { http } from './config'

export default {
    get: async () => {
        const response = await http.get('/RoupasFemininas')
        return response
    }
}