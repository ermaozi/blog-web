import axios from 'axios'
// 环境
axios.defaults.baseURL = 'http://localhost:8000' //  要请求的后台地址
// 请求超时
axios.defaults.timeout = 30000
//  post 请求头
axios.defaults.headers.post['Content-Type'] = 'application/json'

export function get (url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

export function post (url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

export function put (url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

export function $delete (url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            data: params,
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
