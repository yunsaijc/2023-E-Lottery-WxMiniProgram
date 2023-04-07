// pages/detail/detail.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    labelText: "",
    lotteryName: "",
    lot: {},
    param: {},
    tmpId: null,
    signed: false,
    finished: false,
    statusText: "",
    result: null,
    allResult: null,
    showPop: false,
    owned: false
  },
  submit() {
    // console.log(app.globalData.userInfo)
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
    else{
      wx.showModal({
        editable:true,//显示输入框
        placeholderText:'请输入您的数字',//显示输入框提示信息
        success: res => {
          if (res.confirm) { //点击了确认
            this.signUp(res.content)
          }
        }
      })
    }
  },
  signUp(x) {
    wx.request({
      url: app.globalData.targetURL + 'signup/',
      method: 'POST',
      header:{
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      data: {
        userId: app.globalData.userInfo,
        lotteryId: this.data.lot.pk,
        x: x
      },
      success: res => {
        wx.showModal({
          content: res.data.msg,
          editable: false,
          showCancel: false,
          title: '提示'
        })
      }
    })
  },
  verify() {
    wx.request({
      url: app.globalData.targetURL + 'verify/',
      method: 'POST',
      header:{
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      data: {
        userId: app.globalData.userInfo,
        lotteryId: this.data.lot.pk
      },
      success: res => {
        var v1, v2
        if(res.data.v1){v1 = "输入已参与摇号 √"}
        else{v1 = "输入未参与摇号 ×"}
        if(res.data.v2){v2 = "结果生成验证通过 √"}
        else{v2 = "结果生成验证未通过 ×"}
        wx.showModal({
          content: v1 + "\n" + v2,
          editable: false,
          showCancel: false,
          title: '验证结果'
        })
      }
    })
  },
  pop(){
    this.setData({
      showPop: true
    })
  },
  unPop(){
    this.setData({
      showPop: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options)
    this.data.signed = options.signed
    wx.request({
      url: app.globalData.targetURL + 'detail/',
      method: "GET",
      data: {
        userId: app.globalData.userInfo,
        lotteryName: options.lotteryName,
      },
      success: res => {
        if (res.data.errno == 0) {
          this.setData({
            lot: res.data.data[0],
            param: res.data.param[0],
            tmpId: res.data.data[0].tmpId,
            signed: res.data.data[0].signed,
            finished: res.data.data[0].finished,
            result: res.data.result,
            allResult: res.data.allResult
          })
          console.log(res)
          var now = Date.now()
          var ddl = Date.parse(this.data.lot.fields.stoptime)
          if(res.data.data[0].signed){this.setData({labelText: "重新报名摇号"})}
          else{this.setData({labelText: "报名摇号"})}
          if(this.data.finished){this.setData({statusText: "已结束"})}
          else if(this.data.signed){this.setData({statusText: "已报名"})}
          else if(!this.data.signed && (now < ddl)){this.setData({statusText: "接受报名中"})}
          else{this.setData({statusText: "报名结束"})}
          if(this.data.lot.fields.founder==app.globalData.userName){this.setData({owned: true})}
          else{this.setData({owned: false})}
        }
      },
      complete: res => {
        console.log(res)
      }
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