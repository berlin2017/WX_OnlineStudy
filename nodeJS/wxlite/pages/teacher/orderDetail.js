// pages/teacher/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '订单详情',
    title_bg: '#268746',
    userInfo: {
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522726278037&di=23a3f6e356fa7b30e251d2dad073faa4&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01499057fc7f95a84a0e282bfe3089.jpg',
    },
    order_type: 0,
    btn_color: null,
    btn_text: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var color = null;
    var btn_text = null;
    switch (options.order_type) {
      case '0':
        color = '#7647a0';
        btn_text = '确认上课';
        break;
      case '1':
        color = 'orangered';
        btn_text = '确认上课';
        break;
      case '2':
        color = 'orangered';
        btn_text = '结束课程';
        break;
      case '3':
        color = 'orangered';
        btn_text = '已结束';
        break;
    }
    this.setData({
      order_type: options.order_type,
      btn_color: color,
      btn_text: btn_text
    });
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
})