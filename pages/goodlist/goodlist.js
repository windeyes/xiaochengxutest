// pages/goodlist/goodlist.js
import request from '../../utils/request.js'
Page({
  // 顶部标签栏点击
  clickTap(e) {
    console.log(e)
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    goodListData:[],
    keywords: '',
    pagenum:1,
    totalNum:1,
    isloading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 设置keywords
    let {keywords} = options
    this.setData({
      keywords
    })
    this.getGoodList()
  },
  // 获取商品列表
  getGoodList() {
    if(this.data.isloading) return
    this.data.isloading = true
    setTimeout(() => {
      // 请求数据
      request({
        url: '/api/public/v1/goods/search',
        data: {
          // 有个bug在这里
          query: this.data.keywords,
          pagenum: this.data.pagenum,
          pagesize: 8,
        }
      }).then(res => {
        this.setData({
          goodListData: [...this.data.goodListData,...res.data.message.goods],
          totalNum:res.data.message.total
        })
        this.data.isloading = false;
        // console.log(res.data.message)
      })
    }, 1000)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 若是在加载状态
    if(!this.data.isloading){
      this.getGoodList()
      this.setData({
        pagenum: this.data.pagenum + 1
      })
    }
    
  }
})