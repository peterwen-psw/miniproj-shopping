// packageUser/pages/register/step3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: '',
    password: ''
  },
  onChange(event) {
    this.setData({
      password: event.detail
    })
  },
  register () {
    wx.request({
      url: 'http://121.89.205.189:3001/api/user/dofinishregister',
      method: 'POST',
      data: {
        tel: this.data.tel,
        password: this.data.password
      },
      success: () => {
        // 注册成功，返回登录页面
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      tel: options.tel
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