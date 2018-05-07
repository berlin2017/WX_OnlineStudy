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
    leftText: null,
    noBack:true,
    students: [
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
      students: [
        
      ],
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      students: [
       
      ],
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
      // students: [{ name: '李老师', image: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg', info: '小学语文/数学', numbers: 15, ages: 5, }]
    });
    console.log(e.detail.value);
  },

  toDetail: function (e) {
    // var index = e.currentTarget.dataset.index;
    // var teacher = this.data.students[index];
    // wx.navigateTo({
    //   url: 'studentDetail' + '?image=' + teacher.image + '&name=' + teacher.name + '&info=' + teacher.info + '&numbers=' + teacher.numbers + '&ages=' + teacher.ages,
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 2, this)//0表示第一个tabbar
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
      wx.showLoading({
        title: '',
        mask: true,
      })
      wx.request({
        url: 'https://weixin.ywkedu.com/App/student_list',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          openId:app.globalData.myUser.openId
        },
        success:function(res){
          console.log(res);
          wx.hideLoading();
          that.setData({
            students:res.data
          });
        },
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
  
  }
})