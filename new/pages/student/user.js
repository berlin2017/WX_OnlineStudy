// pages/student/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      icon:'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg',
      name:'陈小明',
      mobile:'15605662015',
      grade:'一年级',
      className:'家里蹲幼儿园',
    },
    option_height:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          option_height: res.windowWidth*0.94*0.485
        })
      },
    })
    
    this.requestInfo();
  },

  requestInfo: function () {
    wx.showLoading({
      title: '',
    })
    var that = this;
    wx.request({
      method:'GET',
      url: 'https://weixin.ywkedu.com/App/student_my',
      data: {
        'openId': app.globalData.myUser.openId
      },
      success: function (res) {
        console.log(res);
        that.setData({
          userInfo: res.data
        });
        wx.hideLoading();
      },
      fail: function (res) {
        console.log(res);
      },
    })
  },


  getUser:function(){
    wx.showLoading({
      title: '',
    })
    var that = this;
    wx.request({
      url: 'https://weixin.ywkedu.com/App/userInfo',
      data: {
        'openid': app.globalData.myUser.openId
      },
      success: function (res) {
        console.log(res);
        that.setData({
          userInfo: res.data
        });
        wx.hideLoading();
      },
      fail: function (res) {
        console.log(res);
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.requestInfo();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  toInfo:function(){
   wx.navigateTo({
     url: 'userInfo',
   })
  },

  toWallet:function(){
    wx.navigateTo({
      url: 'userWallet',
    })
  },

  toWrong:function(){
    wx.navigateTo({
      url: 'myOrderHome'+'?order_type='+'0',
    })
  },

  toClass: function () {
    wx.navigateTo({
      url: 'myOrderHome' + '?order_type=' + '1',
    })
  },

  toOrder: function () {
    wx.navigateTo({
      url: 'myOrderHome' + '?order_type=' + '2',
    })
  },

  toRelease: function () {
    wx.navigateTo({
      url: 'myOrderHome' + '?order_type=' + '3',
    })
  },

  toHelp: function () {
    wx.navigateTo({
      url: '../teacher/helpHome',
    })
  },
})