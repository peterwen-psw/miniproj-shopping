// packageUser/pages/register/step1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: ''
  },
  onChange (event) {
    this.setData({
      tel: event.detail
    })
  },
  checkTel () {
    wx.request({
      url: 'http://121.89.205.189:3001/api/user/docheckphone',
      method: 'POST',
      data: {
        tel: this.data.tel
      }, 
      success: res => {
        console.log(res)
        if (res.data.code === '10005') {
          wx.showToast({
            title: '该用户已注册',
            icon: 'none'
          })
        } else {
          // 隐藏条件，第二步需要通过手机号发送短信验证码，所以第一步需要把手机号传递给第二页
          wx.navigateTo({
            url: '/packageUser/pages/register/step2?tel=' + this.data.tel,
          })
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