// pages/teacher/helpHome.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '帮助中心',
    title_bg: '#268746',
    questions: [],
  },

  show:function(e){
    var index = e.currentTarget.dataset.index;
    this.data.questions[index].showDetail = !this.data.questions[index].showDetail;
    this.setData({
      questions:this.data.questions
    });
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
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      url: 'https://weixin.ywkedu.com/App/help',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        for(var index in res.data){
          var str = 'article' + index;
          WxParse.wxParse(str, 'html', res.data[index].content, that, 5);
          res.data[index].article = that.data[str];
        }
        wx.hideLoading();
        that.setData({
          questions:res.data
        });
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '网络请求失败',
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
})