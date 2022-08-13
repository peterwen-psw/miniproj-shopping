// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    empty: true,
    checked: false,
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('cart onLoad')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  getTotalPrice () { // +++++++++++++++++++++++
    const totalPrice = this.data.cartList.reduce((sum, item) => {
      return item.flag ? sum += item.originprice * item.num : sum += 0
    }, 0) * 100
    this.setData({
      totalPrice
    })
  },
  getCartList (userid, token) {
    wx.request({
      url: 'http://121.89.205.189:3001/api/cart/list',
      method: 'POST',
      data: {
        userid: userid
      },
      header: {
        token: token
      },
      success: res => {
        console.log(res.data)
        // 判断购物车有没有数据
        if (res.data.code === '10020') {
          // 购物车没有数据
          this.setData({
            cartList: [],
            empty: true
          })
        } else {
          // every表示所有的返回值都为真，其结果的值才为真
          const checked = res.data.data.every(item => {
            return item.flag
          })
          this.setData({
            cartList: res.data.data,
            empty: false,
            checked: checked
          })
          this.getTotalPrice()
        }
      }
    })
  },
  onItemChange (event) {
    console.log(event)
    const token = wx.getStorageSync('token')
    const userid = wx.getStorageSync('userid')
    wx.request({
      url: 'http://121.89.205.189:3001/api/cart/selectone',
      method: 'POST',
      header: {
        token
      },
      data: {
        cartid: event.currentTarget.dataset.cartid,
        flag: event.detail
      },
      success: () => {
        this.getCartList(userid, token)
      }
    })
  },
  onAllChange (event) {
    console.log(event)
    const token = wx.getStorageSync('token')
    const userid = wx.getStorageSync('userid')
    // this.setData({
    //   checked: event.detail
    // })
    wx.request({
      url: 'http://121.89.205.189:3001/api/cart/selectall',
      method: 'POST',
      header: {
        token
      },
      data: {
        userid: userid,
        type: event.detail
      },
      success: () => {
        this.getCartList(userid, token)
      }
    })
  },
  onNumChange (event) {
    const token = wx.getStorageSync('token')
    const userid = wx.getStorageSync('userid')
    console.log(event.detail)
    wx.request({
      url: 'http://121.89.205.189:3001/api/cart/updatenum',
      method: 'POST',
      header: {
        token
      },
      data: {
        cartid: event.currentTarget.dataset.cartid,
        num: event.detail
      },
      success: () => {
        this.getCartList(userid, token)
      }
    })
  },
  removeItem (event) {
    const token = wx.getStorageSync('token')
    const userid = wx.getStorageSync('userid')
    wx.request({
      url: 'http://121.89.205.189:3001/api/cart/remove',
      method: 'POST',
      data: {
        cartid: event.currentTarget.dataset.cartid
      },
      header: {
        token: token
      },
      success: () => {
        this.getCartList(userid, token)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('cart onShow')
    const loginState = wx.getStorageSync('loginState')
    const token = wx.getStorageSync('token')
    const userid = wx.getStorageSync('userid')
    if (loginState) {
      this.getCartList(userid, token)
    } else {
      wx.navigateTo({
        url: '/packageUser/pages/login/login',
      })
    }
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