// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proid: '',
    banners: [],
    brand: '',
    category: '',
    desc: '',
    discount: 0,
    originprice: 0,
    proname: '',
    current: 0,
    top: 20 // +++++++++++++++++++
  },addCartFn () {  // ++++++++++++++++++++++++++++++
    // 前端校验登录状态
    const loginState = wx.getStorageSync('loginState')
    const userid = wx.getStorageSync('userid')
    const token = wx.getStorageSync('token')
    if (loginState) {
      // 前端校验登录, 后端校验登录状态
      // http://121.89.205.189:3001/apidoc/#api-Cart-PostCartAdd
      wx.request({
        url: 'http://121.89.205.189:3001/api/cart/add',
        method: 'POST',
        header: {
          token: token
        },
        data: {
          userid: userid,
          proid: this.data.proid,
          num: 1
        },
        success: res => {
          wx.showToast({
            title: '加入购物车成功',
            icon: 'none'
          })
        }
      })
    } else {
      // 前端校验未登录
      wx.navigateTo({
        url: '/packageUser/pages/login/login'
      })
    }
  },
  toCart () { // ++++++++++++++++++++++++++++++
    // 购物车页面属于tabbar页面
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  previewImage(event) {
    console.log(event)
    this.setData({
      current: event.currentTarget.dataset.index
    })
    // 预览图片
    // https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewImage.html
    wx.previewImage({
      urls: this.data.banners,
      current: this.data.banners[event.currentTarget.dataset.index]
    })
  },
  changeBanenr(event) {
    console.log(event)
    this.setData({
      current: event.detail.current
    })
  },
  openChat() {
    wx.openCustomerServiceChat({
      extInfo: {
        url: ''
      },
      corpId: '',
      success(res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      proid: options.proid
    })
    // 通过proid 获取产品的详细信息
    //  http://121.89.205.189:3001/apidoc/#api-Pro-GetProDetail
    wx.request({
      url: 'http://121.89.205.189:3001/api/pro/detail/' + options.proid,
      success: res => {
        console.log(res)
        const arr = res.data.data.banners[0].split(',')
        console.log(arr)
        this.setData({
          banners: arr,
          brand: res.data.data.brand,
          category: res.data.data.category,
          desc: res.data.data.desc,
          discount: res.data.data.discount,
          originprice: res.data.data.originprice,
          proname: res.data.data.proname
        })
      }
    })

    // 获取设备信息 ++++++++++++++++++++++
    // https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getSystemInfo.html
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          top: result.statusBarHeight
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})