import axios from 'axios'
import {
    Message
} from 'element-ui'

const http = axios.create({
    timeout: 10 * 1000,
    baseURL: 'https://udkisangel.ml/net-music-api'
});

http.interceptors.request.use(config => {
    return config
})

http.interceptors.response.use(response => {
    return response
}, () => {
    Message.error('网络请求出错，请稍后重试')
})

export default http