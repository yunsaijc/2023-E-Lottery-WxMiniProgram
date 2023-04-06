// pages/register/register.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    username: "",
    password: "",
    phone: "",
    token: ""
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onUsername(e){
    this.setData({
      username: e.detail.value
    })
  },
  onPassword(e){
    this.setData({
      password: e.detail.value
    })
  },
  onPhone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  onToken(e){
    this.setData({
      token: e.detail.value
    })
  },
  getToken(){
    wx.request({
      url: app.globalData.targetURL + 'getToken/',
      method: "POST",
      header:{
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        // username: this.data.username,
        // password: this.data.password,
        phone: this.data.phone
      },
      success: res => {
        wx.showModal({
          content: res.data.msg,
          editable: false,
          showCancel: false,
          title: '提示'
        })
      },
    })
  },
  register(){
    wx.request({
      url: app.globalData.targetURL + 'register/',
      method: "POST",
      header:{
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      data: {
        phone: this.data.phone,
        token: this.data.token
      },
      success: res => {
        wx.showModal({
          content: res.data.msg,
          editable: false,
          showCancel: false,
          title: '提示'
        })
      },
    })
  },
})
