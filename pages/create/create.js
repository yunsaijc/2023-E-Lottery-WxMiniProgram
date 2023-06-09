// pages/create/create.js
const app = getApp()
Page({
  data: {
    stopDate: "",
    stopTime: "",
  },
  dateChange(e){
    this.setData({
      stopDate: e.detail.value
    })
  },
  timeChange(e){
    this.setData({
      stopTime: e.detail.value
    })
  },
  submit(e){
    if (!app.globalData.userInfo){
      wx.showModal({
        content: '需要登录！',
        editable: false,
        title: '提示',
        success: res => {
          if (res.confirm) { //点击了确认
            wx.navigateTo({
              url: '../login/login',
            })
          }
        }
      })
    }
    // console.log(e);
    wx.request({
      url: app.globalData.targetURL + 'createlot/',
      method: 'POST',
      header:{
        "content-type": "application/x-www-form-urlencoded"
      },
      data :{
        userId: app.globalData.userInfo,
        lotteryName: e.detail.value.lotteryName,
        // founder: e.detail.value.founder,
        res_num: e.detail.value.res_num,
        stopTime: e.detail.value.stopDate + ' ' + e.detail.value.stopTime
      },
      success: res => {
        console.log(res)
        wx.showModal({
          content: res.data.msg,
          editable: false,
          showCancel: false,
          title: '提示'
        })
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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