// pages/student/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '我的资料',
    title_bg: '#7647a0',
    sexs:['男','女'],
    grades: ['一年级', '二年级', '三年级', '四年级', '五年级', '初一', '初二', '初三', '高一', '高二', '高三'],
    schools: ['鸡鸣寺小学', '天鹅湖小学'],
    userInfo:{
      sex:0,
      grade:0,
      school:0,
      location:'',
      image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522726278037&di=23a3f6e356fa7b30e251d2dad073faa4&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01499057fc7f95a84a0e282bfe3089.jpg',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // if (that.data.userInfo.image.length==0){
    //   that.data.userInfo.image = '../Resources/userinfo_header.png';
    //   that.setData({
    //     userInfo: that.data.userInfo,
    //   });
    // }
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
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  changeSex:function(e){
    var that = this;
    that.data.userInfo.sex = parseInt(e.detail.value);
    that.setData({
      userInfo: that.data.userInfo
    });
    console.log(that.data.userInfo);
  },

  changeGrade: function (e) {
    var that = this;
    that.data.userInfo.grade = parseInt(e.detail.value);
    that.setData({
      userInfo: that.data.userInfo
    });
    console.log(that.data.userInfo);
  },

  changeLocation: function (e) {
    var that = this;
    that.data.userInfo.location = parseInt(e.detail.value);
    that.setData({
      userInfo: that.data.userInfo
    });
    console.log(that.data.userInfo);
  },

  changeSchool: function (e) {
    var that = this;
    that.data.userInfo.school = parseInt(e.detail.value);
    that.setData({
      userInfo: that.data.userInfo
    });
    console.log(that.data.userInfo);
  },

  choseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.data.userInfo.image = tempFilePaths[0];
        that.setData({
          userInfo:that.data.userInfo,
        });
      }
    })
  },
  

})