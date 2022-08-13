// packageUser/pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: '',
    password: ''
  },
  onTelChange (event) {
    this.setData({
      tel: event.detail
    })
  },
  onPasswordChange (event) {
    this.setData({
      password: event.detail
    })
  },
  login () {
    wx.request({
      url: 'http://121.89.205.189:3001/api/user/login',
      method: 'POST',
      data: {
        loginname: this.data.tel,
        password: this.data.password
      },
      success: res => {
        if (res.data.code === '10010') {
          wx.showToast({
            title: '账户未注册',
            icon: 'none'
          })
        } else if (res.data.code === '10011') {
          wx.showToast({
            title: '密码错误',
            icon: 'none'
          })
        } else {
          console.log(res.data)
          // token字段服务端登录凭证
          // userid 就是标识是哪一个用户
          // 为了方便后期使用，需要吧数据保存到本地
          // https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html
          wx.setStorageSync('token', res.data.data.token)
          wx.setStorageSync('userid', res.data.data.userid)
          wx.setStorageSync('loginState', true) // 前端自己验证登录凭证
          wx.showToast({
            title: '登录成功',
            icon: 'none'
          })
          // 详情页面进入登录，可以从购物车进入登录，可以从个人中心进入，那么登录之后要原路返回
          wx.navigateBack()
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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