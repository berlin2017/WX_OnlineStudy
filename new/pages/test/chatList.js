// pages/test/chatList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'回话列表',
    list:[],
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
    app.globalData.jim.getConversation().onSuccess(function (data) {
      console.log(data);
      that.setData({
        list:data.conversations
      });
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
    });
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