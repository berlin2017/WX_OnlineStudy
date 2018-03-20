// pages/student/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '搜索',
    title_bg: 'purple',
    leftText:'Cancel',
    teachers: [],
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

  bindinput:function(e){
    var keyword = e.detail.value;
    console.log(keyword);
    this.setData({
      teachers: [
        { name: '李老师', image: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3395536432,3763509115&fm=58', info: '辅导科目：小学语文/数学' },
        { name: '李老师', image: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3395536432,3763509115&fm=58', info: '辅导科目：小学语文/数学' },
        { name: '李老师', image: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3395536432,3763509115&fm=58', info: '辅导科目：小学语文/数学' },
        { name: '李老师', image: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3395536432,3763509115&fm=58', info: '辅导科目：小学语文/数学' }]
    })
  },

  back: function () {
    wx.navigateBack({

    })
  },

  toDetail:function(){
    wx.navigateTo({
      url: 'teacherDetail',
    })
  },
})