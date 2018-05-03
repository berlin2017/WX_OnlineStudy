// pages/teacher/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '我的订单',
    leftText: '',
    inputShowed: false,
    inputVal: "",
    orders:[
      { orderNum: 'KC2018040310000', subject: '地理', user_name: '陈小明', user_icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522726278037&di=23a3f6e356fa7b30e251d2dad073faa4&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01499057fc7f95a84a0e282bfe3089.jpg', grade: '高三', remark:'词语的一般解释表册上供填写附注的栏目；第二种意思指在备注栏内所加的注解说明',money:30,time:'2018-03-29 17:30',order_type:0,class_type:0,teacher:'阿飞老师',class_time:'19:00~21:00'},

      { orderNum: 'KC2018040310000', subject: '地理', user_name: '陈小明', user_icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522726278037&di=23a3f6e356fa7b30e251d2dad073faa4&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01499057fc7f95a84a0e282bfe3089.jpg', grade: '高三', remark: '词语的一般解释表册上供填写附注的栏目；第二种意思指在备注栏内所加的注解说明', money: 30, time: '2018-03-29 17:30', order_type: 1, class_type: 0, teacher: '阿飞老师', class_time: '19:00~21:00' },

      { orderNum: 'KC2018040310000', subject: '地理', user_name: '陈小明', user_icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522726278037&di=23a3f6e356fa7b30e251d2dad073faa4&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01499057fc7f95a84a0e282bfe3089.jpg', grade: '高三', remark: '词语的一般解释表册上供填写附注的栏目；第二种意思指在备注栏内所加的注解说明', money: 30, time: '2018-03-29 17:30', order_type: 2, class_type: 0, teacher: '阿飞老师', class_time: '19:00~21:00' },

      { orderNum: 'KC2018040310000', subject: '地理', user_name: '陈小明', user_icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522726278037&di=23a3f6e356fa7b30e251d2dad073faa4&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01499057fc7f95a84a0e282bfe3089.jpg', grade: '高三', remark: '词语的一般解释表册上供填写附注的栏目；第二种意思指在备注栏内所加的注解说明', money: 30, time: '2018-03-29 17:30', order_type: 3, class_type: 0, teacher: '阿飞老师', class_time: '19:00~21:00' },
    ],
    imageWidth: 0,
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",

    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
    });
    console.log(e.detail.value);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var width = wx.getSystemInfoSync().windowWidth * 0.4;
    this.setData({
      imageWidth: width
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
  toDetail: function (e) {
    var item = this.data.orders[e.currentTarget.dataset.index];
    wx.navigateTo({
      url: 'orderDetail' + '?order_type=' + item.order_type,
    })
  },
})