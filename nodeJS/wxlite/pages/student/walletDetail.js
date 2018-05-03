// pages/student/walletDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '账单明细',
    list: [
      {
        num: '100.0',
        ddbh: '2018032701',
        jybh: '20180327100000',
        time: '2018.03.37 10:00:00',
      },
      {
        num: '100.0',
        ddbh: '2018032701',
        jybh: '20180327100000',
        time: '2018.03.37 10:00:00',
      },
      {
        num: '100.0',
        ddbh: '2018032701',
        jybh: '20180327100000',
        time: '2018.03.37 10:00:00',
      },
      {
        num: '100.0',
        ddbh: '2018032701',
        jybh: '20180327100000',
        time: '2018.03.37 10:00:00',
      },
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
  },

})