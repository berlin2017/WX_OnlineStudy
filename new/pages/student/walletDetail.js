// pages/student/walletDetail.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '账单明细',
    list: [
    ],
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
    wx.showLoading({
      title: '',
    })
    var that = this;
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      url: 'https://weixin.ywkedu.com/App/student_account_detail',
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
    this.requestList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.requestList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  back: function () {
    wx.navigateBack({

    })
  },

  requestList:function(){
    wx.showLoading({
      title: '',
    })
    var that = this;
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      url: 'https://weixin.ywkedu.com/App/student_account_detail',
      data: {
        'openId': app.globalData.myUser.openId,
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        if(res.data.code == "0"){
          wx.showToast({
            title: res.data.data.data,
          })
          return;
        }
        var array = new Array();
        for (var i = 0; i < res.data.detail.length; i++) {
          var item = res.data.detail[i];
          item.time = util.formatTime(new Date(item.time) * 1000);
          array.push(item);
        }
        that.setData({
          list: array
        });
      },
      fail: function (res) {
        console.log(res);
      },
    })
  },

})