// pages/main/main2.js
var app = getApp();
var util = require('../../utils/util.js');
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

  intMsgReceive: function (e) {
    var that = this;
    // wx.showLoading({
    //   title: '',
    // })
    app.globalData.jim.onMsgReceive(function (data) {
      console.log(data);

      for (var index in data.messages) {


        if (data.messages[index].from_username) {

          var history = wx.getStorageSync(data.messages[index].from_username);
          if (!history || history == '') {
            history = [];
          } else {
            history = JSON.parse(history);
          }

          if (data.messages[index].content.msg_type === 'image') {
            app.globalData.jim.getResource({
              'media_id': data.messages[index].content.msg_body.media_id,
            }).onSuccess(function (res) {
              //data.code 返回码
              //data.message 描述
              //data.url 资源临时访问路径
              data.messages[index].content.msg_body.media_id = res.url
            }).onFail(function (res) {
              //data.code 返回码
              //data.message 描述
            });
          }
          data.messages[index].ctime_ms = util.formatTime(new Date(data.messages[index].ctime_ms));
          var msgs = history.concat(data.messages);
          wx.setStorage({
            key: data.messages[index].from_username,
            data: JSON.stringify(msgs),
          })
        }
        if (data.messages[index].content.msg_type === 'text' && data.messages[index].content.msg_body.text === '发起视频通话') {
          console.log('发起视频通话');
          wx.navigateTo({
            url: '../test/chating' + '?id=' + data.messages[0].content.from_id + '&type=' + e + '&call_type=1',
          })
          return;
        } else if (data.messages[index].content.msg_type === 'text' && data.messages[index].content.msg_body.text === '发起语音通话') {
          console.log('发起语音通话');
          wx.navigateTo({
            url: '../test/chating' + '?id=' + data.messages[0].content.from_id + '&type=' + e + '&call_type=0',
          })
          return;
        }
        wx.showModal({
          title: '新消息',
          content: '来自' + data.messages[0].content.from_name + '是否查看',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateTo({
                url: '../test/chating' + '?id=' + data.messages[0].content.from_id + '&type=' + e,
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    });

  },

  toTeacherMain: function () {
    this.intMsgReceive(1);

    wx.showLoading({
      title: '',
    })
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: 'https://weixin.ywkedu.com/App/teacher_check',
      data: {
        openId: app.globalData.myUser.openId
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        if (res.data.msg == 1) {
          wx.navigateTo({
            url: '../teacher/main',
          })
          // wx.navigateTo({
          //   url: '../teacher/user?enable=1',
          // })
        } else if (res.data.msg == 0) {
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
        } else {
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

  toStudentMain: function () {
    this.intMsgReceive(2);
    wx.switchTab({
      url: '../student/main',
    })
  }

})