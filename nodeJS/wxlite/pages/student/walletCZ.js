// pages/student/walletCZ.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '充值',
    moneys: [
      { num: 50, remark: '' },
      { num: 100, remark: '' },
      { num: 200, remark: '' },
      { num: 300, remark: '' },
      { num: 500, remark: '赠送100元' }],
    selectIndex: 0,
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
    this.setData({
      selectIndex: index
    });
  },

  pay:function(){
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: '',
      paySign: '',
    })
  },

})