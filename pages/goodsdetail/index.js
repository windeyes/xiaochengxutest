// pages/goodsdetail/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_data:{},
    myarr:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { goods_id } = options
    console.log(goods_id)
    request({
      url:'/api/public/v1/goods/detail',
      data:{
         goods_id
      }
    }).then(res=>{
      this.setData({
        goods_data:res.data.message
      })
      this.setData({
        myarr: res.data.message
      })
      console.log(res.data.message)
    })
  },
  addCar(){
    let shopping_car = wx.getStorageSync('shopping_car') || []
    let exit = shopping_car.some(item=>{
      let exit = item.id === this.data.myarr.goods_id
       if(exit){
         item.count++
       }
       return exit
    })
    if(!exit){
      let shopping_car_item = {
        id: this.data.myarr.goods_id,
        logo: this.data.myarr.goods_big_logo,
        title: this.data.myarr.goods_name,
        price: this.data.myarr.goods_price,
        count: 1
      }
      shopping_car.unshift(shopping_car_item)
      wx.setStorageSync('shopping_car', shopping_car)
      wx.showToast({ title: '商品已加入购物车'})
      
    }
    else{
      wx.setStorageSync('shopping_car', shopping_car)
      wx.showToast({ title: '商品数量已加一' })
    }
    
  }

})