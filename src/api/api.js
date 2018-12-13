  import http from './http'
  const api = {
    get : (url,opt)=>{
      return http.get(url,{params:opt})
    },
    post : (url,opt)=>{
      return http.post(url,opt);
    },
    exportExl : (url,opt)=>{
      return http.post(url,opt,{responseType: 'blob'})
    },
  }
  export default api
