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
    grades: [
      { name: '一年级', checked: false },
      { name: '二年级', checked: false },
      { name: '三年级', checked: false },
      { name: '四年级', checked: false },
      { name: '五年级', checked: false },
      { name: '初一', checked: false },
      { name: '初二', checked: false },
      { name: '初三', checked: false },
      { name: '高一', checked: false },
      { name: '高二', checked: false },
      { name: '高三', checked: false },
    ],
    showGrade: false,
    gradeValue:[],
    subjects: [
      { name: '语文', image: '../Resources/ic_yuwen.png', id: '0', checked: false },
      { name: '数学', image: '../Resources/ic_shuxue.png', id: '1', checked: false },
      { name: '英语', image: '../Resources/ic_yingyu.png', id: '2', checked: false },
      { name: '奥数', image: '../Resources/ic_aoshu.png', id: '3', checked: false },
      { name: '地理', image: '../Resources/ic_dili.png', id: '4', checked: false },
      { name: '物理', image: '../Resources/ic_wuli.png', id: '5', checked: false },
      { name: '化学', image: '../Resources/ic_huaxue.png', id: '6', checked: false },
      { name: '历史', image: '../Resources/ic_lishi.png', id: '7', checked: false }
    ],
    showSubjects: false,
    subjectValue: [],
    idPic:null,
    jobPic:null,
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

  checkboxChange: function (e) {
    if (e.detail.value.length > 6) {
      wx.showToast({
        title: '最多选6个',
      })
      return;
    }
    console.log(e);
    var that = this;
    for (var i = 0; i < that.data.grades.length; i++) {
      if (array_contain(e.detail.value, i)) {
        that.data.grades[i].checked = true;
      } else {
        that.data.grades[i].checked = false;
      }
    }
    that.setData({
      gradeValue: e.detail.value,
      grades: that.data.grades
    });
  },

  showGrade: function () {
    this.data.showGrade = !this.data.showGrade;
    this.setData({
      showGrade: this.data.showGrade
    });
  },

  showSubject: function () {
    this.data.showSubject = !this.data.showSubject;
    this.setData({
      showSubject: this.data.showSubject
    });
  },

  subjectChanged: function (e) {
    if (e.detail.value.length > 6) {
      wx.showToast({
        title: '最多选6个',
      })
      return;
    }
    console.log(e);
    var that = this;
    for (var i = 0; i < that.data.subjects.length; i++) {
      if (array_contain(e.detail.value, i)) {
        that.data.subjects[i].checked = true;
      } else {
        that.data.subjects[i].checked = false;
      }
    }
    that.setData({
      subjectValue: e.detail.value,
      subjects: that.data.subjects
    });
  },

  choseJobPic:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
        jobPic: tempFilePaths[0]
        });
      },
    })
  },

  choseIdPic:function(){
    var that = this;
    wx.chooseImage({
      count:1,
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          idPic:tempFilePaths[0]
        });
      },
    })
  },

  choseHeader:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.data.userInfo.image = tempFilePaths[0];
        that.setData({
          userInfo: that.data.userInfo
        });
      },
    })
  },

  registe:function(){
    wx.redirectTo({
      url: 'main',
    })
  },
  
})


function array_contain(array, obj) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == obj)//如果要求数据类型也一致，这里可使用恒等号===
      return true;
  }
  return false;
}