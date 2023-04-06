// pages/myCreate/myCreate.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lotteries: {}
  },
  update() {
    wx.request({
      url: app.globalData.targetURL + 'updatemyCreate/',
      method: 'POST',
      header:{
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        userId: app.globalData.userInfo
      },
      success: res => {
        // console.log(res)
        this.setData({
          lotteries: res.data.data
        })
      }
    })
  },
  onItem(e) {
    console.log(e)
    wx.navigateTo({
      url: '../detail/detail?lotteryName=' + e.currentTarget.dataset.item.fields.lotteryname + '&signed=true',
      // events: events,
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {
        console.log(res)
      },
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
    if(!app.globalData.userInfo){
      wx.showModal({
        content: '需要登录！',
        editable: false,
        title: '提示',
        success: res => {
          if (res.confirm) { //点击了确认
            wx.navigateTo({
              url: '../login/login'
            })
            // this.onReady()
          }
        }
      })
    }
    else{
      this.update()
    }
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