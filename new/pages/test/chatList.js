// pages/test/chatList.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'回话列表',
    chatList:[],
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
    var that = this;
    if(app.globalData.jim.isLogin()){
      that.requestList();
      app.globalData.jim.onMsgReceive(function (data) {

        //不显示loading
        app.globalData.jim.getConversation().onSuccess(function (data) {
          console.log(data);
          var list = new Array();
          for (var i = 0; i < data.conversations.length; i++) {
            var item = data.conversations[i];
            item.mtime = util.formatTime(new Date(item.mtime));
            list.push(item);
          }
          that.setData({
            chatList: list
          });
        }).onFail(function (data) {
          console.log(data);
        });

      });
    }else{
      if (app.globalData.myUser&&app.globalData.myUser.openId){
        app.globalData.jim.login({
          'username': app.globalData.myUser.openId,
          'password': 'ah123456'
        }).onSuccess(function () {
          that.requestList();
          app.globalData.jim.onMsgReceive(function (data) {

            //不显示loading
            app.globalData.jim.getConversation().onSuccess(function (data) {
              console.log(data);
              var list = new Array();
              for (var i = 0; i < data.conversations.length; i++) {
                var item = data.conversations[i];
                item.mtime = util.formatTime(new Date(item.mtime));
                list.push(item);
              }
              that.setData({
                chatList: list
              });
            }).onFail(function (data) {
              console.log(data);
            });

          });
        }).onFail(function (data) {
          //同上
          console.log(data);
        });
      }
      
    }
    
  },

  requestList:function(){
    wx.showLoading({
      title: '',
      mask: true,
    })
    var that = this;
    app.globalData.jim.getConversation().onSuccess(function (data) {
      console.log(data);
      var list = new Array();
      for (var i = 0; i < data.conversations.length; i++) {
        var item = data.conversations[i];
        item.mtime = util.formatTime(new Date(item.mtime));
        list.push(item);
      }
      that.setData({
        chatList: list
      });
      wx.hideLoading();
      //data.code 返回码
      //data.message 描述
      //data.conversations[] 会话列表，属性如下示例
      //data.conversations[0].extras 附加字段
      //data.conversations[0].unread_msg_count 消息未读数
      //data.conversations[0].name  会话名称
      //data.conversations[0].appkey  appkey(单聊)
      //data.conversations[0].username  用户名(单聊)
      //data.conversations[0].nickname  用户昵称(单聊)
      //data.conversations[0].avatar  头像 media_id 
      //data.conversations[0].mtime 会话最后的消息时间戳
      //data.conversations[0].gid 群 id(群聊)
      //data.conversations[0].type  会话类型(3 代表单聊会话类型，4 代表群聊会话类型)
    }).onFail(function (data) {
      //data.code 返回码
      //data.message 描述
      console.log(data);
      wx.hideLoading();
    });
  },

  switchToChating:function(e){
    app.globalData.jim.resetUnreadCount({
      'username': e.currentTarget.dataset.data
    });
    this.requestList();
    wx.navigateTo({
      url: 'chating?name=' + e.currentTarget.dataset.data + '&nickName=' + e.currentTarget.dataset.nickname + '&logo=' + e.currentTarget.dataset.logo,
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
  back:function(){
    wx.navigateBack({
      
    })
  },
})