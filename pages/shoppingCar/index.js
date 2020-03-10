// pages/shoppingCar/index.js
import request from '../../utils/request.js'
Page({
  /* 页面的初始数据*/
  data: {
    imgsrc:"",
    shoppingCarData:[],
    showCountText:false,
    isfocus:false
  },

  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    // request()
    this.init();
    // console.log(this.data.shoppingCarData)
  },
  // 加载初始化
  init(){
    this.setData({
      shoppingCarData: wx.getStorageSync('shopping_car')
    })
  },
  // 点击事件
  conutClick(e){
    // console.log(e.currentTarget.dataset.count)
    // console.log(123)
    const {count,index} = e.currentTarget.dataset
    if(count === '1'){
      // console.log(this.data.shoppingCarData[index])
      this.data.shoppingCarData[index].count++
     
     
    }
    else if(count === '-1'){
      console.log(12)
      this.data.shoppingCarData[index].count--
     
     
    }
    wx.setStorageSync('shopping_car', this.data.shoppingCarData)
    this.init();
  },
  //显示文字
  handlerShowText(){
    this.setData({
      showCountText:true
    })
  },
  //显示输入框
  handlerShowInput() {
    this.setData({
      showCountText: false,
      isfocus:true
    })
  }
})