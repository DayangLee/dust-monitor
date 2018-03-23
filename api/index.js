import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
    baseURL: 'http://web.test.hw99lt.com:8080',
    // baseURL: 'http://app.hwlantian.com',
    withCredentials: true
})

export default service