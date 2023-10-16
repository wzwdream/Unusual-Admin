import Http from '@/utils/request'

export const getTestDataArray = () => {
    return Http.post('/user')
}
export const sendEmail = (data:any) => {
    return Http.post('/mail',data)
}
