// pages/home/home.js
import {
  navList
} from "./../../utils/nav"
import {
  getProList
} from "../../api/home"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    top: 20,
    navList,
    proList: [],
    count: 2,
    scrollTop: 0
  },
  onTabItemTap(obj) {
    console.log(obj)
    const iconArr = ["/resources/home_active.png", "/resources/kind_active.png", "/resources/cart_active.png", "/resources/user_active.png"]
    wx.setTabBarItem({
      index: 0,
      text: '首页',
      iconPath: '/resources/home_active.png',
      selectedIconPath: iconArr[this.data.index % 4]
    })
    this.setData({
      index: this.data.index + 1
    })
  },
  gotoSearch () {
    wx.navigateTo({
      url: '/packageSearch/pages/search/search',
    })
  },
  toDetail(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/detail/detail?proid='+e.currentTarget.dataset.proid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
    this.animation = wx.createAnimation()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      index: 0
    })

    getProList().then(res => {
      // console.log(res.data.data);
      this.setData({
        proList: res.data.data
      })
    })
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
    getProList().then(res=>{
      this.setData({
        proList:res.data.data,
        count:2
      })
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log('加载数据');
    getProList({
      count: this.data.count
    }).then(res => {
      if (res.data.data.length === 0) {
        wx.showToast({
          title: '没有更多的数据了',
          icon: "none"
        })
      } else {
        this.setData({
          proList: [...this.data.proList, ...res.data.data],
          count: this.data.count + 1
        })
      }
    })
  },
  onPageScroll({scrollTop}) {
    // console.log(scrollTop);
    if (scrollTop > 50) {
      this.animation.scale(0.7).step()
      this.setData({
        animation: this.animation.export()
      })
    } else {
      this.animation.scale(1).step()
      this.setData({
        animation: this.animation.export()
      })
    }
    this.setData({
      scrollTop
    })
  },
  backtop() {
    wx.pageScrollTo({
      duration: 500,
      scrollTop: 0
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})