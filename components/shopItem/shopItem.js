// components/shopItem/shopItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showCountText:{
      type:Boolean,
      value:true
    },
    shoppingItem:{
      type:Object,
      value:{}
    },
    ShopIndex:{
      type: Number,
      value: 0
    },
    isInCar: {
      type: Boolean,
      value: true
    },
    isfilter:{    //是否有必要过滤没选中的值
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    conutClick(e) {
      // console.log(e.currentTarget.dataset.count)
      // console.log(123)
      const { count } = e.currentTarget.dataset
      let olddata = wx.getStorageSync('shopping_car')
      if (count === '1') {
        // console.log(this.data.shoppingCarData[index])
        this.data.shoppingItem.count++
        olddata[this.data.ShopIndex].count++
        this.setData({
          shoppingItem: this.data.shoppingItem
        })


      }
      else if (count === '-1') {
        
        if(this.data.shoppingItem.count === 1){
          // 若等于一则判断是否删除该商品
          return wx.showModal({
            title:'删除数据',
            content:'是否从购物车中移出',
            success:(res)=>{
              // 若点击了确定
              if (res.confirm){
                const deldata = olddata.splice(this.data.ShopIndex,1)
                // console.log(olddata)
                
                wx.setStorageSync('shopping_car', olddata)
                this.triggerEvent('delItem', deldata)
              }
            }
          })
          /* return wx.showToast({
            title: '商品数量不能小于0',
          }) */
        }
        else{
          this.data.shoppingItem.count--
          olddata[this.data.ShopIndex].count--
          this.setData({
            shoppingItem: this.data.shoppingItem
          })
        }

      }  
      // console.log('执行这个了')
      // console.log('哈哈',olddata)
      wx.setStorageSync('shopping_car', olddata)
      // 计算价格
      this.triggerEvent('checkGoods')
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
    // 是否选中商品
    checkGoods() {
      let olddata = wx.getStorageSync('shopping_car')
      // 变量记录是否选中
      const isSelect = this.data.shoppingItem.isSelect
      this.data.shoppingItem.isSelect = !isSelect
      this.setData({
        shoppingItem: this.data.shoppingItem
      })
      // console.log(this.data.shoppingItem)
      olddata[this.data.ShopIndex].isSelect = !isSelect
      wx.setStorageSync('shopping_car', olddata)
      this.triggerEvent('checkGoods')
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      // console.log(this.data.shoppingItem)
     
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  
})
