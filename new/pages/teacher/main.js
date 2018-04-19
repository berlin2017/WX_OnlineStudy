// pages/teacher/main.js
const app = getApp()
var template = require('tabbar.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [
    ],
    orders:[],
    imageWidth:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 0, this)//0表示第一个tabbar
    var width = wx.getSystemInfoSync().windowWidth*0.4;
    this.setData({
      imageWidth:width
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.requestPage();
  },

  requestPage:function(){
    var that = this;
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: 'https://weixin.ywkedu.com/App/teacher_home',
      data:{
        openId:app.globalData.myUser.openId
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(e){
        wx.hideLoading();
        console.log(e);
        var array = new Array();
        if (e.data.indent){
          for (var i = 0; i < e.data.indent.length; i++) {
            var item = e.data.indent[i];
            item.create_time = util.formatTime(new Date(parseInt(item.create_time) * 1000));
            array.push(item);
          }
        }
        that.setData({
          images:e.data.slide,
          orders: array
        });
      },
      fail: function (e) {
        wx.hideLoading();
        wx.showToast({
          title: '请求失败',
        })
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
    this.requestPage();
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

  back: function () {
    wx.navigateBack({

    })
  },

  toDetail:function(){
    wx.navigateTo({
      url: 'orderDetail',
    })
  },

})

