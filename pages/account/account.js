// pages/account/account.js
const app = getApp()
Page({
    data: {
        isLogin: app.globalData.userInfo
    },
    logOut() {
      app.globalData.userInfo = null
      app.globalData.userName = ""
      app.onLaunch()
      this.onShow()
    },
    onLogin() {
      wx.navigateTo({
        url: '../login/login',
        // events: events,
        success: (result) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady: function () {
        // 页面渲染完成

    },
    onShow: function () {
        // 页面显示
        this.setData({
          isLogin: app.globalData.userInfo,
          username: app.globalData.userName
            // userData:wx.getStorageSync("userData")//用户信息
        })

    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
})