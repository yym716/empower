//对axios封装js
//异步请求axios
import axios from 'axios'
import { Message, Notification } from 'element-ui';

axios.defaults.baseURL = "";  //加入公用的ip地址
//请求前的拦截器
axios.interceptors.request.use(config => {
    
    return config
}, error => {
    //  console.log(1);
    Message({
        showClose: true,
        message: "错误!",
        type: "warning"
    });

    return error
})

//请求被响应后的拦截器
axios.interceptors.response.use(response => {
    // console.log(response)
    if (response.data.code === "306") {
        Notification.error({
            title: `响应${response.data.code}`,
            message: `${response.data.msg}!`,
            duration: 0
        });
        return;
    }


    if (response.data.code) {
        Notification.error({
            title: `响应${response.data.code}`,
            message: `${response.data.msg}!`,
            duration: 0
        });
        return;
    }



    if (response.data.errorCode == 500) {
        Notification.error({
            title: '响应500',
            message: '服务器内部错误',
            duration: 0
        });
        Message({
            showClose: true,
            message: "响应500,服务器内部错误!",
            type: "warning"
        });
        return;
    }



    return response;
}, error => {
    // console.log(error)

    Message({
        showClose: true,
        message: "请求失败！",
        type: "warning"
    });

    return error;
})


//对get和post请求进行封装
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: params }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}



export default axios;