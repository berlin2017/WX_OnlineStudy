// pages/teacher/order.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'订单列表',
    title_bg: '#268746',
    inputShowed: false,
    inputVal: "",
    images: [],
    imageWidth: 0,
    orders:[],
    state:0,
    requestUrl:null,
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
    var width = wx.getSystemInfoSync().windowWidth * 0.4;
    this.setData({
      imageWidth: width
    });
    
    var title ='订单列表';
    var requestUrl = 'https://weixin.ywkedu.com/App/teacher_indent_my'
    switch (options.state){
      case '1':
        title = '已抢单';
        requestUrl = 'https://weixin.ywkedu.com/App/teacher_yiqiang';
      break;
      case '2':
        title = '上课中';
        requestUrl = 'https://weixin.ywkedu.com/App/teacher_shangke';
        break;
      case '3':
        title = '待评价';
        requestUrl = 'https://weixin.ywkedu.com/App/teacher_yiping';
        break;
    }
    this.setData({
      state: options.state,
      title:title,
      requestUrl: requestUrl
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  requestList: function () {
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      url: that.data.requestUrl,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openId: app.globalData.myUser.openId
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        if (!res.data) {
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
    this.requestList();
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
  toDetail:function(e){
    var that = this;
    var item = that.data.orders[e.currentTarget.dataset.index];
    wx.navigateTo({
      url: 'orderDetail'+'?id='+item.indent_id,
    })
  },
})