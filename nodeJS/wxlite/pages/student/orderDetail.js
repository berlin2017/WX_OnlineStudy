// pages/teacher/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '订单详情',
    order_type: 0,
    btn_color: null,
    btn_text: null,
    order: { orderNum: 'KC2018040310000', subject: '地理', user_name: '陈小明', user_icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522726278037&di=23a3f6e356fa7b30e251d2dad073faa4&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01499057fc7f95a84a0e282bfe3089.jpg', grade: '高三', remark: '词语的一般解释表册上供填写附注的栏目；第二种意思指在备注栏内所加的注解说明', money: 30, time: '2018-03-29 17:30', order_type: 3, class_type: 0, teacher: '阿飞老师', class_time: '19:00~21:00', teacher_icon: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', teacher_info:'小学语文/数学',star:8.8},
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
        btn_text = '加价并发布';
        break;
      case '3':
        color = 'orangered';
        btn_text = '立即评价';
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
  jump:function(){
    var that = this;
    if (that.data.order_type == 0){
      wx.navigateTo({
        url: 'sendQuestion',
      })
    } else if (that.data.order_type == 3){
  
        wx.navigateTo({
          url: 'comment' + '?image=' + that.data.order.teacher_icon + '&name=' + that.data.order.teacher + '&info=' + that.data.order.teacher_info+'&star='+that.data.order.star ,
      })
    } 
  },
})