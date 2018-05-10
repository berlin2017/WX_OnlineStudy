// pages/student/main.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [
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
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      url: 'https://weixin.ywkedu.com/App/slide',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        that.setData({
          images: res.data
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

  toSend:function(){
    
    this.requestInfo();

  },
  toTest:function(){
    // wx.navigateTo({
    //   url: '../test/chating',
    // })
  },

  requestInfo: function () {
    wx.showLoading({
      title: '',
      mask: true,
    })
    var that = this;
    wx.request({
      method: 'GET',
      url: 'https://weixin.ywkedu.com/App/student_info',
      data: {
        'openId': app.globalData.myUser.openId,
        'id': app.globalData.myUser.uid,
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        if(res.data.userInfo.tel&&res.data.userInfo.realname){
          wx.navigateTo({
            url: 'sendQuestion',
          })
        }else{
          wx.showToast({
            title: '请先完善资料',
            duration:2000
          })
          setTimeout(function(){
            wx.navigateTo({
              url: 'userInfo',
            })
          },2000)
        }
      },
      fail: function (res) {
        console.log(res);
      },
    })
  },
})