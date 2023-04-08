// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    userName: "",
    targetURL: 'https://e-lottery.top/api/',
    // targetURL: 'http://127.0.0.1:8000/api/',
    // targetURL: 'http://192.168.43.152:8000/api/',
    // targetURL: 'http://192.168.43.34:8000/api/',
  }
})
