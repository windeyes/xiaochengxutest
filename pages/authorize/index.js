// pages/authorize/index.js
import request from '../../utils/request.js'
Page({
  getUserInfo(e){
    const { encryptedData, rawData, iv, signature} = e.detail
    let data = {

      encryptedData,
      rawData, //性别 0：未知、1：男、2：女
      iv,
      signature
    }
    wx.login({
      success:(res)=>{
        data.code = res.code
        request({
          url: '/api/public/v1/users/wxlogin',
          method: 'POST',
          data
        }).then(res => {
          wx.setStorageSync('token', res.data.message.token)
          wx.navigateBack({
            delta:1
          })
        })
      }
    })
   
    
    
  }
})