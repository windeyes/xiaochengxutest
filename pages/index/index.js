import request from '../../utils/request.js'
Page({
  data: {
    // 轮播图
    imagesData: '',
    //活动菜单
    activity:'',
    // 楼层数据
    floor:'',
    // 是否在顶部
    isTop:true
  },
  onLoad(options) {
    // 轮播图数据
     request({
      url: '/api/public/v1/home/swiperdata'
    }).then(res=>{
      this.setData({
        imagesData:res.data.message
      })
    })
    // 活动菜单
    request({
      url:'/api/public/v1/home/catitems'
    }).then(res=>{
      this.setData({
        activity:res.data.message
      })
    })
    //楼层数据
    request({
      url:"/api/public/v1/home/floordata"
    }).then(res=>{
      this.setData({
        floor :res.data.message
      })
      console.log(res.data.message)
    })
  },
  // 回到最顶层
  backTop() {
    console.log(123)
    wx.pageScrollTo({ scrollTop: 0 })
  },
  onPageScroll(scrollTop){
    let itemdata = this.data.isTop;
    if(scrollTop.scrollTop >= 100){
      itemdata = false
    }
    if (scrollTop.scrollTop < 100) {
      itemdata = true
    }
    if (itemdata === this.isTop){
      return 
    }else{
      this.setData({
        isTop : itemdata
      })
    }
  }
})
