// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lotteries: {}
  },
  onCreate() {
    wx.switchTab({
      url: '/pages/create/create',
    })
  },
  onMyLot() {
    wx.switchTab({
      url: '/pages/myLottery/myLottery',
    })
  },
  onItem(e) {
    // console.log(e)
    wx.navigateTo({
      url: '../detail/detail?lotteryName=' + e.currentTarget.dataset.item.fields.lotteryname,
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {
        // console.log(res)
      },
    })
  },
  update() {
    wx.request({
      url: app.globalData.targetURL + 'update/',
      method: 'GET',
      success: res => {
        // console.log(res)
        this.setData({
          lotteries: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.update()
    // console.log(this.lotteries)
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
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '刷新中...',
    })
    this.update()
    setTimeout(function () {
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 2000)
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