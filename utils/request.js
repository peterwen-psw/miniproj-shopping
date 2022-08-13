 const baseUrl = 'http://121.89.205.189:3001/api'
 export default {
   get(url, data) {
     wx.showLoading({
       title: '数据正在加载',
     })
     return new Promise((resolve, reject) => {
       wx.request({
         url: baseUrl + url,
         method: 'GET',
         data: data || {},
         header: {},
         success(res) {
           resolve(res)
         },
         fail() {
           reject()
         },
         complete() {
           wx.hideLoading()
         }
       })

     })
   },
   post(url, data) {
     wx.showLoading({
       title: '数据正在加载',
     })
     return new Promise((resolve, reject) => {
       wx.request({
         url: baseUrl + url,
         method: 'POST',
         data: data || {},
         header: {},
         success(res) {
           resolve(res)
         },
         fail() {
           reject()
         },
         complete() {
           wx.hideLoading()
         }
       })

     })
   }
 }