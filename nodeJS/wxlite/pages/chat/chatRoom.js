// pages/chat/chatRoom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      title:'聊天室',
    messages:[
      { content: '老师你好', uid: 1, icon:'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg',},
      { content: '老师你好', uid: 2, icon: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg',},
      { content: '老师你好', uid: 1, icon: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg',},
      { content: '老师你好', uid: 2, icon: 'http://www.fzlqqqm.com/uploads/allimg/20150806/201508062253342606.jpg',},
      ],
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
  back:function(){
    wx.navigateBack({
      
    })
  },
})