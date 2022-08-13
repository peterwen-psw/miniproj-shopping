// pages/test/test.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:"大雷",
    id:0,
    condition:false,
    list:['a','b','c','d'],
    list1:[{id:0,name:'leson',age:'18'},{id:1,name:'leson2',age:'18'},{id:2,name:'leson3',age:'18'}],
    item:{
      index:0,
      msg:'阿吧阿巴巴巴',
      time:'2022年6月22日20:39:11'
    },
    username:'',
    password:''
  },
  changeUsername (event) {
    console.log(event)
    this.setData({
      username: event.detail.value
    })
  },
  changeMessage () {
    app.globalData.num=99999
    // 修改状态
    this.setData({ // this.setState()
      message: '我不是大雷'+app.globalData.num
    })
  },
  changeMessageParams (event) {
    console.log(event)
    this.setData({
      message: event.currentTarget.dataset.val
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