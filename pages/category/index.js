// pages/category/index.js
import request from '../../utils/request.js'
Page({
  clickTitle(e) {
    // const {index} = e.currentTarger
    const { index } = e.currentTarget.dataset
    this.setData({
      currentIndex: index
    })
   
  },
  /**
   * 页面的初始数据
   */
  data: {
    catData:'',
    currentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      url:'/api/public/v1/categories'
    }).then(res=>{
      // console.log(res)
      this.setData({
        catData:res.data.message
      })
    })
  }
  
})