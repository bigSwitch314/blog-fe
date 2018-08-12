import axios from 'axios'
import Qs from 'qs';

// 1.创建axios实例
const ajax = axios.create({
  baseURL: 'http://bigswitch314.cn/', // api的base_url
  withCredentials: true,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest: [function (data) {
    // `transformRequest` allows changes to the request data before it is sent to the server
    // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
    return Qs.stringify(data);
  }],
  timeout: 50000        // 请求超时时间
});

const ajax2 = axios.create({
  baseURL: 'http://bigswitch314.cn/', // api的base_url
  withCredentials: true,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest: [function (data) {
    // `transformRequest` allows changes to the request data before it is sent to the server
    // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
    return Qs.stringify(data);
  }],
  timeout: 50000        // 请求超时时间
});

  export default {ajax, ajax2};