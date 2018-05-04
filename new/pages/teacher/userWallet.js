// pages/teacher/userWallet.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '我的钱包',
    title_bg:'#268746',
    isShowDialog:false,
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
      url: 'https://weixin.ywkedu.com/App/teacher_account',
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

  toCZ: function () {
    wx.navigateTo({
      url: 'walletCZ',
    })
  },

  toDetail: function () {
    wx.navigateTo({
      url: 'walletDetail',
    })
  },

  hideDialog:function(){
    this.setData({
      isShowDialog:false
    });
  },

  showDialog: function () {
    this.setData({
      isShowDialog: true
    });
  },

  commit:function(e){
    if (parseInt(e.detail.value.money)<100){
      wx.showToast({
        title: '最低100优豆',
      })
      return;
    }

    if (parseInt(e.detail.value.money) % 100 !=0) {
      wx.showToast({
        title: '金额为100倍数',
      })
      return;
    }

    if (!e.detail.value.account || e.detail.value.account == '') {
      wx.showToast({
        title: '请填写账户',
      })
      return;
    }

    if (parseInt(e.detail.value.money) > parseInt(this.data.money)) {
      wx.showToast({
        title: '余额不足',
      })
      return;
    }

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
      url: 'https://weixin.ywkedu.com/App/teacher_tixian',
      data: {
        'openId': app.globalData.myUser.openId,
        money:e.detail.value.money,
        zhifu_account: e.detail.value.account,
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        if(res.data.msg == 1){
          that.setData({
            isShowDialog: false
          });
          wx.showToast({
            title: '提交成功,请等待',
          })
        }else{
          wx.showToast({
            title: res.data.data,
          })
        }
       
      },
      fail: function (res) {
        console.log(res);
      },
    })
  },

  dismiss:function(){
    this.setData({
      isShowDialog:false
    });
  },

})