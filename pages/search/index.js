// pages/search/index.js
import requeset from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTap: false,
    searchResult: '',
    dataInput: '',
    isLoading:false,
    historyData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      historyData :wx.getStorageSync('historyInput')
    })
  },
  // 用户输入时
  userInput(e) {
    
    if (e.detail.value.trim()) {
      this.setData({
        showTap: true,
        dataInput: e.detail.value.trim()
      })
      // 判断输入的是否是空格
      if (this.data.lasetInput != this.data.dataInput) {
        // 判断上次是否处于加载状态
        if (!this.data.isLoading)
        {
          this.data.isLoading = true;
          this.setData({
            lasetInput: this.data.dataInput
          })
          requeset({
            url: '/api/public/v1/goods/qsearch',
            data: {
              query: e.detail.value.trim()
            }
          }).then(res => {

            this.setData({
              searchResult: res.data.message.splice(0, 10),
              
            })
            this.data.isLoading = false;
            // console.log(this.data.dataInput)
          })
        }
       
      }

    } else {
      this.setData({
        showTap: false,
        dataInput: []
      })
    }

  },
  clickit(e) {
    
  },
  // 回车时
  enterDown(e){
    
    let arr = wx.getStorageSync('historyInput') || []
    console.log(arr)
    arr.unshift(e.detail.value)
    arr = [...new Set(arr)]
    wx.setStorageSync('historyInput',arr)
    this.setData({
      historyData: arr
    })
    wx.redirectTo({
      url: `../goodlist/goodlist?keywords=${e.detail.value}`
    })
  },
  //点击取消时
  cancle(){
    this.setData({
      dataInput:'',
      showTap:false
    })
  }
})