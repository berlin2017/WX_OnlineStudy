// pages/student/userWallet.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'我的钱包',
    money:0,
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
    
  },

  requestInfo:function(){
    wx.showLoading({
      title: '',
      mask: true,
    })
    var that = this;
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      url: 'https://weixin.ywkedu.com/App/student_account',
      data: {
        'openId': app.globalData.myUser.openId,
      },
      success: function (res) {
        console.log(res);
        that.setData({
          money: res.data.account
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
    this.requestInfo();
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
    his.requestInfo();
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
  back:function(){
    wx.navigateBack({
      
    })
  },

  toCZ:function(){
    wx.navigateTo({
      url: 'walletCZ',
    })
  },

  toDetail:function(){
    wx.navigateTo({
      url: 'walletDetail',
    })
  },

})