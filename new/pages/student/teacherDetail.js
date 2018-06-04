// pages/student/teacherDetail.js
var app = getApp();
var util = require('../../utils/util.js');
var tabs = [
  {
    name: "老师介绍"
  },
  {
    name: "学员评价"
  }
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    image:null,
    name:null,
    info:null,
    tabs: tabs,     //展示的数据
    slideOffset: 0,//指示器每次移动的距离
    activeIndex: 0,//当前展示的Tab项索引
    sliderWidth: 96,//指示器的宽度,计算得到
    contentHeight: 0,//页面除去头部Tabbar后，内容区的总高度，计算得到
    comments: {},
    nomore:false,
    pageIndex:1,
    star: 0,
    starMap: [
      '非常差',
      '差',
      '一般',
      '好',
      '非常好',
    ],
    detail:{},
  },

  back:function(){
    wx.navigateBack({
      
    })
  },

  myStarChoose(e) {
    let star = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star: star,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          //计算相关宽度
          sliderWidth: res.windowWidth / that.data.tabs.length,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          contentHeight: res.windowHeight - res.windowWidth / 750 * 68//计算内容区高度，rpx -> px计算
        });
      }
    });

    console.log(options);
    that.setData({
      id:options.openId,
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.requestDetail();
    this.requestComments();
  },

  requestDetail:function(){
    var that = this;
    wx.showLoading({
      title: '',
      mask:true,
    })
    wx.request({
      // method: 'POST',
      // header: {
      //   'content-type': 'application/x-www-form-urlencoded'
      // },
      url: 'https://weixin.ywkedu.com/App/teacher_info',
      data: {
        'openId': that.data.id
      },
      success: function (res) {
        console.log(res);
        var score = parseFloat(res.data.teacher_score) * 10;
        res.data.teacher_score = score.toFixed(2);
        that.setData({
          detail: res.data
        });
        wx.hideLoading();
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
    this.requestDetail();
    this.requestComments();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.requestComments();
  },

  requestComments:function(){
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      url: 'https://weixin.ywkedu.com/App/pingjia',
      data:{
        'openId':that.data.id,
      },
      success:function(res){
        console.log(res);
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].time = util.formatTime(new Date(parseInt(res.data.data[i].time) * 1000));
        }
        that.setData({
          comments:res.data
        });
        wx.hideLoading();
      },
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  bindChange: function (e) {
    var current = e.detail.current;
    this.setData({
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current
    });
    console.log("bindChange:" + current);
  },

  navTabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    console.log("navTabClick:" + e.currentTarget.id);
  },

  toSend:function(){
    var that = this;
    wx.navigateTo({
      url: 'sendQuestion?openid=' + that.data.detail.openid+'&name='+that.data.detail.realname,
    })
  }

})