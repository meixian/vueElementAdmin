import axios from 'axios';
import qs from "qs";
import router from '@/router';
import { Message } from 'element-ui';
import { getToken } from './auth';

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    // 设定拦截器
    interceptors(instance) {
        instance.interceptors.request.use((config) => {
            const token = getToken();
            if (token) {
                config.headers['x-access-token'] = token;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        })
        instance.interceptors.response.use(response => {
            // const { data } = response;
            // if (data.success) {
            //     return Promise.resolve(data.data);
            // } else if (data.success === undefined) {
            //     return Promise.resolve(response);
            // } else {
            //     // token不合法
            //     if (response.data.code === 100002) {
            //         router.replace('/login');
            //     }
            //     Message({
            //         message: response.data.errMsg,
            //         type: 'error',
            //         duration: 1000
            //     })
            //     return Promise.reject(response);
            // }
            return Promise.resolve(response);
        }, error => {
            return Promise.reject(error);
        })
    }
    httpDefaultOpts(url, method, data) {
        data = data ? data : {};
        const httpDefaultOpts = {
            method: method,
            url: url,
            params: data,
            data: qs.stringify(data),
            headers: method == "get" ? {
                Accept: "application/json",
                "Content-Type": "application/json; charset=UTF-8"
            } : {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
        }
        if (method == "get") {
            delete httpDefaultOpts.data;
        } else {
            delete httpDefaultOpts.params;
        }
        return httpDefaultOpts;
    }
    // 创建实例
    request(url, type, data) {
        const instance = axios.create({
            withCredentials: true,
            baseURL: this.baseUrl
        });
        this.interceptors(instance);

        if (type == 'upload') {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const formData = new FormData();
            formData.append('file', data.file);

            const copyData = data;
            delete copyData.file;
            const queryStr = '';
            for (let i in copyData) {
                queryStr += `&${i}=${copyData[i]}`;
            }
            url += '?' + queryStr.substring(1);

            let promise = new Promise(function (resolve, reject) {
                instance.post(url, formData, config).then(res => {
                    resolve(res.data);
                }).catch(res => {
                    reject(res.data);
                })
            });
            return promise;
        } else {
            let promise = new Promise((resolve, reject) => {
                instance(this.httpDefaultOpts(url, type, data))
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(res => {
                        reject(res.data);
                    });
            });
            return promise;
        }
    }
    get(url, data) {
        return this.request(url, "get", data);
    }
    post(url, data) {
        return this.request(url, "post", data);
    }
    upload(url, data) {
        return this.request(url, "upload", data);
    }
}

const request = new HttpRequest(process.env.VUE_APP_BASE_API);
export default request;
