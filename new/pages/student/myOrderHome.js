// pages/teacher/order.js
var app = getApp();
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '我的订单',
    inputShowed: false,
    inputVal: "",
    orders: [],
    imageWidth: 0,
    order_type:0,
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",

    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
    });
    console.log(e.detail.value);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var title = '';
    switch(options.order_type){
      case '0':
        title = '未接单';
      break;
      case '1':
        title = '已接单';
        break;
      case '2':
        title = '授课中';
        break;
      case '3':
        title = '待评价';
        break;
    }
    var width = wx.getSystemInfoSync().windowWidth * 0.4;
    this.setData({
      imageWidth: width,
      order_type:options.order_type,
      title:title,
    });
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   this.requestList();
  },

  requestList:function(){
    var that = this;
    var request_url = '';
    switch(that.data.order_type){
      case '0':
        request_url = 'https://weixin.ywkedu.com/App/student_weijie';
        break;
      case '1':
        request_url = 'https://weixin.ywkedu.com/App/student_yijie';
        break;
      case '2':
        request_url = 'https://weixin.ywkedu.com/App/student_start';
        break;
      case '3':
        request_url = 'https://weixin.ywkedu.com/App/student_daiping';
        break;
    }
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      url: request_url,
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        openId:app.globalData.myUser.openId
      },
      success:function(res){
        console.log(res);
        wx.hideLoading();
        if(!res.data){
          return;
        }
        var array = new Array();
        for (var i = 0; i < res.data.length; i++) {
          var item = res.data[i];
          item.time = util.formatTime(new Date(parseInt(item.time) * 1000));
          array.push(item);
        }
        that.setData({
          orders: array
        });
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '数据请求失败',
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
    this.requestList();
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
  toDetail: function (e) {
    var item = this.data.orders[e.currentTarget.dataset.index];
    wx.navigateTo({
      url: 'orderDetail' + '?id=' + item.indent_id,
    })
  },
})