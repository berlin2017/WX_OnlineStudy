// pages/student/myteacher.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_bg:'#7647a0',
    title:'我的老师',
    noBack: true,
    teachers: [
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
      // teachers: [
       
      // ],
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      // teachers: [
       
      // ],
    });
  },
  inputTyping: function (e) {
    console.log(e);
    this.setData({
      inputVal: e.detail.value,
      // teachers: []
    });
    console.log(e.detail.value);
  },


  search: function (e) {
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: 'https://weixin.ywkedu.com/App/search_teacher',
      data: {
        'name': e.detail.value
      },
      success: function (res) {
        that.setData({
          teachers: res.data
        });
        wx.hideLoading();
      },
    })
  },


  toDetail:function(e){
    var index = e.currentTarget.dataset.index;
    var teacher = this.data.teachers[index];
    wx.navigateTo({
      url: 'teacherDetail' + '?openId=' + teacher.openid,
    })
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
   this.requestList();
  },

  requestList:function(){
    var that = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      url: 'https://weixin.ywkedu.com/App/teacher_list',
      data: {
        'openId': app.globalData.myUser.openId
      },
      success: function (res) {
        console.log(res);
        that.setData({
          teachers: res.data
        });
        wx.hideLoading();
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
    if (this.data.inputVal){
      this.search();
    }else{
      this.requestList();
    }
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
  
  }
})