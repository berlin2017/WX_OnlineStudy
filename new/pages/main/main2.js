// pages/main/main2.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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

  toTeacherMain:function(){

    wx.showLoading({
      title: '',
    })
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: 'https://weixin.ywkedu.com/App/teacher_check',
      data:{
        openId:app.globalData.myUser.openId
      },
      success:function(res){
        wx.hideLoading();
        console.log(res);
        if(res.data.msg == 1){
          wx.navigateTo({
            url: '../teacher/main',
          })
          // wx.navigateTo({
          //   url: '../teacher/user?enable=1',
          // })
        } else if (res.data.msg == 0){
          wx.showToast({
            title: '账户审核中...',
          })
          wx.navigateTo({
            url: '../teacher/user?enable=1',
          })
        } else if (res.data.msg == 2) {
          wx.showToast({
            title: '账户被冻结,请联系管理员',
          })
          wx.navigateTo({
            url: '../teacher/user?en1able=1',
          })
        }else{
          wx.navigateTo({
            url: '../teacher/regist',
          })
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '请求失败',
        })
      },
    })
  },

  toStudentMain:function(){
    wx.switchTab({
      url: '../student/main',
    })
  }

})