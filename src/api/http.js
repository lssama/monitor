/**
 * @author lizhaoran@zsbatech.com
 * @file
 * @created 2018/7/17
 */
import axios from 'axios'
import {Message} from 'element-ui';
import router from '../router'

axios.defaults.withCredentials = false //为true时设置在请求时加上session，为false时不加session
const service = axios.create({
    // 请求超时时间
		timeout: 600000,
		dataType:'json',
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
		'Access-Control-Allow-Origin': "*",
});

let token='';
service.interceptors.request.use(
  config=>{
    // console.log('config');
    // console.log(config);
		token=localStorage.getItem('token');
		config.headers.token=token;
    return config
  },
  error=>{
    return Promise.reject(error);
  });

/**
 * 拦截器
 */
service.interceptors.response.use(response=> {
  return new Promise((resolve, reject) => {
    resolve(response.data);
    // if(!token && !(/\/user\/login/.test(response.config.url))){
    //   Message.error('登录失效，请重新登陆');
    //   router.push('/login');
    //   resolve(response.data);
    // }else if(response.data.code == 202010){
    //   Message.error('登录失效，请重新登陆');
    //   router.push('/login');
    //   resolve(response.data);
    // }else if(/export/.test(response.config.url)){
    //   resolve(response.data);
    // }else if (response.data.code !== 200) {
    //   Message.error(response.data.msg);
    //   reject(response.data);
    // }else {
    //   resolve(response.data);
    // }
  });
}, error=> {
    Message.error('网络超时，:'+error);
    return Promise.reject(error);
});

export default service;
