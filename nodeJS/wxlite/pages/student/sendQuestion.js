// pages/student/sendQuestion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'发布题目',
    title_bg:'#7647a0',
    image:'',
    chosed:false,
    // grades: ['一年级', '二年级', '三年级', '四年级', '五年级', '初一', '初二', '初三', '高一', '高二', '高三', '大一', '大二', '大三', '大四'],
    grades: ['一年级', '二年级', '三年级', '四年级', '五年级', '初一', '初二', '初三', '高一', '高二', '高三'],
    currentGrade:0,
    subjects: ['语文', '数学', '英语', '化学', '物理', '生物', '历史', '地理', '政治'],
    currentSubject:0,
  },

  changeGrade:function(e){
    this.setData({
      currentGrade:e.detail.value
    });
  },

  changeSubject: function (e) {
    this.setData({
      currentSubject: e.detail.value
    });
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

  choseImage:function(){
    var that = this;
    wx.chooseImage({
      count:1,
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          image:tempFilePaths[0],
          chosed:true
        });
      },
    })
  },
  
  send:function(e){
   
    var price = e.detail.value['price_input'];
    var remark = e.detail.value['remark_input'];
    console.log(price);
    console.log(remark);

  },

  toSearch:function(){
    wx.navigateTo({
      url: 'search',
    })
  },

})