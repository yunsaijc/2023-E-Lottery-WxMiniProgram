// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    username: "",
    password: "",
    result: {}
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
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
            username: this.username,
            password: this.password,
          },
          success: res => {
            if (res.errno == 0) {
              console.log(res)
              this.setData({
                result: res.data	//服务器返回的结果 
              })    
            }
          },
          complete: res => {
            console.log(res)
          },
    })
  },
  register(){
    wx.request({
      url: 'http://192.168.43.4:8000/api/register/',
      method: "POST",
          header:{
            "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
          },
          data: {
            username: this.username,
            password: this.password,
          },
          success: res => {
            if (res.errno == 0) {
              console.log(res)
              this.setData({
                result: res.data	//服务器返回的结果 
              })    
            }
          },
    })
  },
})
