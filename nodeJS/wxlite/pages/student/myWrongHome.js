// pages/student/myWrongHome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '我的错题本',
    subjects: [
      { name: '语文', image: '../Resources/ic_yuwen.png' ,id:'0'},
      { name: '数学', image: '../Resources/ic_shuxue.png', id: '1'},
      { name: '英语', image: '../Resources/ic_yingyu.png', id: '2'},
      { name: '奥数', image: '../Resources/ic_aoshu.png', id: '3'},
      { name: '地理', image: '../Resources/ic_dili.png', id: '4'},
      { name: '物理', image: '../Resources/ic_wuli.png', id: '5'},
      { name: '化学', image: '../Resources/ic_huaxue.png', id: '6'},
      { name: '历史', image: '../Resources/ic_lishi.png', id: '7'}
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

  toList:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    wx.navigateTo({
      url: 'wrongList'+'?id='+that.data.subjects[index].id,
    })
  },

  back:function(){
    wx.navigateBack({
      
    })
  },
})