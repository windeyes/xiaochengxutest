// pages/shoppingCar/index.js
import request from '../../utils/request.js'
Page({
  /* 页面的初始数据*/
  data: {
    imgsrc:"",
    shoppingCarData:[],
    showCountText:false,
    isfocus:false,
    address:{},
    choiceAll:false,
    AllPrice:0
  },

  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    this.setData({
      address: wx.getStorageSync('userAddress') || {}
    })
  },
  onShow(){
    this.init();
    
  },
  // 加载初始化
  init(){
    /* console.log('我被执行啦')
    console.log(wx.getStorageSync('shopping_car')) */
    this.setData({
      shoppingCarData: wx.getStorageSync('shopping_car')
    })
    const no_choiceAll  = this.data.shoppingCarData.some(item=>{
      return item.isSelect === false
    })  
    this.data.shoppingCarData.forEach(item=>{
      if(item.isSelect){
        this.data.AllPrice += item.price*item.count
      }
    })
    this.setData({
      AllPrice:this.data.AllPrice
    })
    this.setData({
      choiceAll : !no_choiceAll
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
    // this.init();
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
  },
  del(){
    
    this.init()
  },
  // 获取收获地址
  getAddress(){
    wx.chooseAddress({
      success:(res=>{
        const { userName, detailInfo, telNumber} = res
        let addressData = {
          userName,
          detailInfo,
          telNumber
        }
        this.setData({
          address:addressData
        })
        wx.setStorageSync('userAddress', addressData )
      })
    })
  },
  //判断是否全选
  ClickAllChoice(){
    // 拿取本地的最新数据
    const shoppingCarData = wx.getStorageSync('shopping_car')
    const no_choiceAll = shoppingCarData.some(item => {
      return item.isSelect === false
    })
    this.data.AllPrice = 0
    // 计算价格
    shoppingCarData.forEach(item => {
      if (item.isSelect) {
        this.data.AllPrice += item.price * item.count
      }
    })
    this.setData({
      AllPrice: this.data.AllPrice
    })
    this.setData({
      choiceAll : !no_choiceAll
    })
  },
  userPay(){
    wx.navigateTo({
      url:"../orderconfirm/index"
    })
  },
  // 全选
  clickAll(){
   
    this.setData({
     
    })
    this.data.choiceAll = !this.data.choiceAll
    this.data.shoppingCarData.forEach(item => {
      item.isSelect = this.data.choiceAll
    })
    this.setData({
      choiceAll:this.data.choiceAll,
      shoppingCarData:this.data.shoppingCarData
    })
    wx.setStorageSync('shopping_car', this.data.shoppingCarData)
  }
})