// login.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    username: "",
    password: ""
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
  login(){
    wx.request({
      url: app.globalData.targetURL + 'login/',
      method: "POST",
      header:{
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      data: {
        username: this.data.username,
        password: this.data.password,
      },
      success: res => {
        wx.showModal({
          content: res.data.msg,
          editable: false,
          showCancel: false,
          title: '提示',
          success: res2 => {
            if (res2.confirm) {
              if (res.data.errno == 0) {
                // console.log(res)
                app.globalData.userInfo = res.data.userId
                app.globalData.userName = res.data.username
                wx.navigateBack()
              }
            }
          }
        })
      },
      complete: res => {
        // console.log(res)
      },
    })
  },
  register(){
    wx.navigateTo({
      url: '../register/register',
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {
        // console.log(res)
      },
    })
  },
})
