// pages/teacher/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '认证信息',
    title_bg: '#268746',
    userInfo: {
      image: '',
      sex: '男',
    },
    grades: ['一年级', '二年级', '三年级', '四年级', '五年级', '初一', '初二', '初三', '高一', '高二', '高三'],
    gradeValue: ['一年级', '二年级'],
    showGrade:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (that.data.userInfo.image.length <= 0) {
      that.data.userInfo.image = '../Resources/ic_user_header.png';
      that.setData({
        userInfo: that.data.userInfo
      });
    }
    // console.log(contains(this.data.gradeValue, "二年级"));
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

  back: function () {
    wx.navigateBack({

    })
  },

  checkboxChange:function(e){
    console.log(e);
    this.setData({
      gradeValue: e.detail.value
    });
  },

  showGrade:function(){
    this.data.showGrade = !this.data.showGrade;
    this.setData({
      showGrade: this.data.showGrade
    });
  },
})

function contains(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
}  

function array_contain(array, obj) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == obj)//如果要求数据类型也一致，这里可使用恒等号===
      return true;
  }
  return false;
}