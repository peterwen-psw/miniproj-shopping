// pages/fenlei/fenlei.js
import {getFeilei,getFeileiList,Fenlei} from "../../api/fenlei"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainActiveIndex: 0,
    activeId: null,
    items:[],
    active: 1,
    list:[],
    text:"",
    brand:"",
    arr:[]

  },
 cc(){
console.log(111111111);
  },
  toDetail(event){
    console.log(event);
    wx.navigateTo({
      url: '/pages/detail/detail?proid=' + event.currentTarget.dataset.proid
    })
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
    // console.log(event);
    this.setData({
      brand:event.detail.title
    })
    Fenlei({
      category:this.data.text,
      brand:this.data.brand

    }).then(res=>{
      // console.log(res);
      this.setData({
        arr:res.data.data
      })
    })
  },
  onClickNav({ detail = {} }) {
    console.log(detail);
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
    console.log(this.data.items[detail.index].text);
    console.log(this.data.items[detail.index].children);
    this.setData({
      list:this.data.items[detail.index].children,
      text:this.data.items[detail.index].text
    })
    

  },
  

  onClickItem({ detail = {} }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;

    this.setData({ activeId });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    getFeilei().then(res=>{
      // console.log(res);
      const arr=res.data.data
      const brr=[]
      // console.log(arr);
      arr.forEach(item=>{
        brr.push({
          text:item
        })
        getFeileiList({
          category:item
        }).then(res=>{
          // console.log(res);
          brr.forEach(info=>{
            // item.children=res.data.data
            if(info.text==item){
              info.children=res.data.data
            }
            // console.log(item);
          })
          
        })

      })
      console.log(brr);
      this.setData({
        items:brr
      })
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