// pages/student/walletCZ.js
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
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: '',
      paySign: '',
    })
  },

})