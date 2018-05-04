// pages/teacher/main.js
const app = getApp()
var template = require('tabbar.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
    },
    option_height: 0,
    wxUser:{},
    enable:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.enable != 1 && options.enable != 2){
      this.setData({
        enable: options.enable
      })
      template.tabbar("tabBar", 3, this)//0表示第一个tabbar
    }else{
      this.setData({
        enable: options.enable
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          option_height: res.windowWidth * 0.94 * 0.485
        })
      },
    })
    that.setData({
      wxUser: app.globalData.myUser
    });

  
  },

  requestInfo: function () {
    wx.showLoading({
      title: '',
      mask: true,
    })
    var that = this;
    wx.request({
      method: 'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: 'https://weixin.ywkedu.com/App/teacher_my',
      data: {
        'openId': app.globalData.myUser.openId,
        'id': app.globalData.myUser.uid,
      },
      success: function (res) {
        console.log(res);
        if (parseInt(res.data.indent.num)/10000>=1){
          res.data.indent.num = (parseInt(res.data.indent.num) / 10000).toFixed(0) +'w'
        } else if (parseInt(res.data.indent.num) / 1000 >= 1){
          res.data.indent.num = (parseInt(res.data.indent.num) / 1000).toFixed(0) + 'k'
        }else{
          res.data.indent.num = parseInt(res.data.indent.num);
        }

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

  back: function () {
    wx.navigateBack({

    })
  },
  toInfo: function () {
    wx.navigateTo({
      url: 'regist?type=1',
    })
  },

  toWallet: function () {
    wx.navigateTo({
      url: 'userWallet',
    })
  },

  toWrong: function () {
    wx.navigateTo({
      url: 'order' + '?state=1',
    })
  },

  toClass: function () {
    wx.navigateTo({
      url: 'order' + '?state=2',
    })
  },

  toOrder: function () {
    wx.navigateTo({
      url: 'order' + '?state=3',
    })
  },

  toRelease: function () {
    // wx.navigateTo({
    //   url: 'order' + '?state=5',
    // })
  },

  toHelp: function () {
    wx.navigateTo({
      url: 'helpHome',
    })
  },


})

