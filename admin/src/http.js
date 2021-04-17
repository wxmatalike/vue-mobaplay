import axios from 'axios'
import Vue from 'vue'
import router from './router/index'

const http = axios.create({
    //用于判断环境变量，替换接口
    baseURL:process.env.VUE_APP_API_URL || '/admin/api',
    // baseURL: 'http://localhost:3000/admin/api'
})
//拦截器(添加头部header)
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    }
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

//拦截器(传递message)
http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message.error({
            type: 'error',
            message: err.response.data.message
        })
        if(err.response.status==401){
            router.push('/login')
        }
    }

    return Promise.reject(err)
})

export default http