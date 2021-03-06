

let request = (config={})=>{
  let {url} = config
  if (!(/^https:/.test(url))){   
    config.url = request.defaults.baseURL + url
  }
  return new Promise((result,reject)=>{
    wx.request({
      ...config,
      success(res){
        result(res)
      },
      fail(res) {
        reject(res)
      },
      complete(res){
        request.err(res)
      }
    })
  })
}
// 用于设置基准路劲
request.defaults={
  baseURL:''
}
request.err = ()=>{}
request.onerror=(callback)=>{
  request.err =  callback
}
export default request