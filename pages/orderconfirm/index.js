// pages/shoppingCar/index.js
import request from '../../utils/request.js'
Page({
  /* 页面的初始数据*/
  data: {
    imgsrc: "",
    shoppingCarData: [],
    showCountText: false,
    isfocus: false,
    address: {},
    choiceAll: false,
    AllPrice: 0
  },

  /* 生命周期函数--监听页面加载*/
  onLoad: function(options) {
    this.setData({
      address: wx.getStorageSync('userAddress') || {}
    })
  },
  onShow() {
    this.init();

  },
  // 加载初始化
  init() {
    console.log(wx.getStorageSync('shopping_car'))
    this.setData({
      shoppingCarData: wx.getStorageSync('shopping_car')
    })
    const no_choiceAll = this.data.shoppingCarData.some(item => {
      return item.isSelect === false
    })
    this.data.shoppingCarData.forEach(item => {
      if (item.isSelect) {
        this.data.AllPrice += item.price * item.count
      }
    })
    this.setData({
      AllPrice: this.data.AllPrice
    })
    this.setData({
      choiceAll: !no_choiceAll
    })

  },
  // 点击事件
  conutClick(e) {
    // console.log(e.currentTarget.dataset.count)
    // console.log(123)
    const {
      count,
      index
    } = e.currentTarget.dataset
    if (count === '1') {
      // console.log(this.data.shoppingCarData[index])
      this.data.shoppingCarData[index].count++


    } else if (count === '-1') {
      this.data.shoppingCarData[index].count--


    }
    wx.setStorageSync('shopping_car', this.data.shoppingCarData)
    // this.init();
  },
  //显示文字
  handlerShowText() {
    this.setData({
      showCountText: true
    })
  },
  //显示输入框
  handlerShowInput() {
    this.setData({
      showCountText: false,
      isfocus: true
    })
  },
  del() {

    this.init()
  },
  // 获取收获地址
  getAddress() {
    wx.chooseAddress({
      success: (res => {
        const {
          userName,
          detailInfo,
          telNumber
        } = res
        let addressData = {
          userName,
          detailInfo,
          telNumber
        }
        this.setData({
          address: addressData
        })
        wx.setStorageSync('userAddress', addressData)
      })
    })
  },
  //判断是否全选
  ClickAllChoice() {
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
      choiceAll: !no_choiceAll
    })
  },
  payment() {
    let token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '../authorize/index'
      })
    } else {
      //创建订单的对象
      let creat_data = {
        order_price: this.data.AllPrice,
        consignee_addr: this.data.address.detailInfo
      }

      creat_data.goods = this.data.shoppingCarData.map(item => {
        return {
          goods_id: item.id,
          goods_number: item.count,
          goods_price: item.price
        }
      })
      // 创建订单
      request({
        url: '/api/public/v1/my/orders/create',
        method: 'POST',
        header: {
          Authorization: token
        },
        data: creat_data
      }).then(res => {
        // 获取支付参数

        request({
          url: '/api/public/v1/my/orders/req_unifiedorder',
          method: 'POST',
          header: {
            'Authorization': token
          },
          data: {
            order_number: res.data.message.order_number
          }
        }).then(res => {
          var {
            pay
          } = res.data.message

          console.log(res.data.message.pay)
          console.log(pay.timeStamp) 
          // wx.requestPayment(pay)
          wx.requestPayment({
            timeStamp: pay.timeStamp,
            nonceStr: pay.nonceStr,
            package: pay.package,
            paySign: pay.paySign,
            signType:pay.signType
          })
        })
      })
    }
  }
})