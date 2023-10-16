import Http from '@/utils/request'

export const getTestDataArray = () => {
    return Http.post('/api/user')
}
