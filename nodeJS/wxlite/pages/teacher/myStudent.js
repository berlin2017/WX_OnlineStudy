// pages/teacher/myStudent.js
const app = getApp()
var template = require('tabbar.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_bg: '#268746',
    title: '我的学生',
    leftText: '',
    teachers: [
      { name: '小明', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '智商很高', numbers: 15, ages: 5, grade:'三年级',subjects:['数学','语文'],},
      { name: '小明', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '智商很高', numbers: 15, ages: 5, grade: '三年级',subjects:['数学', '语文'],},
      { name: '小明', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '智商很高', numbers: 15, ages: 5, grade: '三年级',subjects:['数学', '语文'],},
      { name: '小明', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '智商很高', numbers: 15, ages: 5, grade: '三年级',subjects:['数学', '语文'],},
      { name: '小明', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '智商很高', numbers: 15, ages: 5, grade: '三年级',subjects:['数学', '语文'],}
    ],
    inputShowed: false,
    inputVal: ""
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
      teachers: [
        { name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, },
        { name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, },
        { name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, },
        { name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, },
        { name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, }
      ],
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      teachers: [
        { name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, },
        { name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, },
        { name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, },
        { name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, },
        { name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, }
      ],
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
      teachers: [{ name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, }]
    });
    console.log(e.detail.value);
  },

  toDetail: function (e) {
    var index = e.currentTarget.dataset.index;
    var teacher = this.data.teachers[index];
    wx.navigateTo({
      url: 'studentDetail' + '?image=' + teacher.image + '&name=' + teacher.name + '&info=' + teacher.info + '&numbers=' + teacher.numbers + '&ages=' + teacher.ages,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 1, this)//0表示第一个tabbar
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
  
  }
})