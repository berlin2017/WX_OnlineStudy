// pages/student/walletCZ.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '充值',
    moneys: [],
    selectIndex: 0,
    money:null,
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
      mask: true,
    })
    var that = this;
    wx.request({
      url: 'https://weixin.ywkedu.com/App/gifts',
      success:function(res){
        that.setData({
          moneys:res.data
        });
        wx.hideLoading();
      }
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
  back: function () {
    wx.navigateBack({

    })
  },


  changeIndex: function (e) {
    var index = e.currentTarget.dataset.index;
    var that = this;
    that.setData({
      selectIndex: index,
      money:that.data.moneys[index].cz_money,
    });
  },

  pay:function(){
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.login({
      success: result => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(result);
        wx.request({
          url: 'https://weixin.ywkedu.com/App/zhifu',
          // method: 'POST',
          // header: {
          //   'content-type': 'application/x-www-form-urlencoded'
          // },
          data: {
            code: result.code,
            total_fee: that.data.moneys[that.data.selectIndex].cz_money
          },
          success: function (res) {
            var data = res.data;
            console.log(data);
            console.log(res);
            wx.requestPayment({
              'timeStamp': data.jsApiParameters.timeStamp,
              'nonceStr': data.jsApiParameters.nonceStr,
              'package': data.jsApiParameters.package,
              'signType': 'MD5',
              'paySign': data.jsApiParameters.paySign,
              'success': function (res) {
                console.log(res);
                wx.hideLoading();
                console.log('支付成功');
                that.requestPaySuccess(data.order.out_trade_no);
              },
              'fail': function (res) {
                wx.hideLoading();
                console.log('支付失败');
              }
            })
          },
          fail: function (res) {
            wx.hideLoading();
            wx.showToast({
              title: '请求失败',
            })
          },
        })
      }
    })
  },

  requestPaySuccess:function(e){
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      url: 'https://weixin.ywkedu.com/App/zhifu_order',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openId: app.globalData.myUser.openId,
        out_trade_no:e,
        money: that.data.moneys[that.data.selectIndex].cz_money,
        zeng_money: that.data.moneys[that.data.selectIndex].zs_money
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        wx.showToast({
          title: 'Success',
        })
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '请求失败',
        })
      },
    })
  },

})