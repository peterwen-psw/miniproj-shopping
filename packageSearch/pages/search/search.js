// packageSearch/pages/search/search.js
import {
  getSearch
} from "../../../api/fenlei"
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    list: [],
    brr: [],
    flag: true,
    value: ''

  },
  onClick() {
    wx.showToast({
      title: '搜索',
      icon: 'none'
    })
  },
  toDetail(event) {
    console.log(event);
    wx.navigateTo({
      url: '/pages/detail/detail?proid=' + event.currentTarget.dataset.proid
    })
  },
  fuzhi(e) {
    console.log(e.currentTarget.dataset.item);
    console.log(11111);

    getSearch({
      keyword: e.currentTarget.dataset.item
    }).then(res => {
      console.log(res);
      this.setData({
        brr: res.data.data,
        value: e.currentTarget.dataset.item
      })
    })
    this.setData({
      flag: false
    })
  },
  search(e) {
    console.log(e.detail);
    getSearch({
      keyword: e.detail
    }).then(res => {
      console.log(res);
      this.setData({
        brr: res.data.data
      })
    })
    this.setData({
      flag: false
    })

    // console.log(e.detail);
    // const arr=[]

    if (this.data.list.indexOf(e.detail) == -1) {
      this.data.list.unshift(e.detail)

    } else {
      this.data.list.splice(this.data.list.indexOf(e.detail), 1)
      this.data.list.unshift(e.detail)

    }
    wx.setStorageSync('list', this.data.list)

    // console.log(this.data.arr);


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(this.data.arr);
    // wx.setStorageSync('list', this.data.list)
    const a = app.globalData.arr
    // console.log(a);
    this.setData({
      list: a
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