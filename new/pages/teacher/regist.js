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
      { id: '1', name: '一年级', subject: [{ name: '语文', id: '1'}]},
      { id: '2', name: '二年级', subject: [{ name: '语文', id: '1' }, { name: '数学', id: '2'}] },
      { id: '3', name: '三年级', subject: [{ name: '语文', id: '1' }, { name: '数学', id: '2' }, { name: '英语', id: '3'}] },
      { id: '4', name: '四年级', subject: [{ name: '语文', id: '1' }, { name: '数学', id: '2' }, { name: '英语', id: '3' }, { name: '地理' ,id: '4'}] },
      { id: '5', name: '五年级', subject: [{ name: '语文', id: '1' }, { name: '数学', id: '2' }, { name: '英语', id: '3' }, { name: '地理', id: '4' }, { name: '历史', id: '5'}] },
    ],
    showSubjects: false,
    subjectValue: [],
    idPic:null,
    jobPic:null,
    selectSubject:[],
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

  bindMultiPickerChange:function(e){
    console.log(e);
    // var class_index = e.detail.value[0];
    // var subject_index = e.detail.value[0];
    // this.data.subjects[0][class_index].id

    // if (this.data.selectSubject){
    //   this.data.selectSubject = new Array();
    //   this.setData({
    //     selectSubject: this.data.selectSubject
    //   });
    // }

    if (!array_contain(this.data.selectSubject,e.detail.value)){
      this.data.selectSubject.push(e.detail.value);
      this.setData({
        selectSubject: this.data.selectSubject
      });
    }else{
      wx.showToast({
        title: '已添加过了',
      })
    }
    console.log(this.data.selectSubject);
  },

  bindcolumnchange:function(e){
    var that = this;
    if (e.detail.column == 0){
      that.data.subjects.pop();
      that.data.subjects.push(that.data.subjects[0][e.detail.value].subject);
      that.setData({
        subjects: that.data.subjects
      });
    }
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
      this.setData({
        subjects: this.data.subjects
      });
      return;
    }
    console.log(e);
    var that = this;
    // for (var i = 0; i < that.data.grades.length; i++) {
    //   if (array_contain(e.detail.value, i)) {
    //     that.data.grades[i].checked = true;
    //   } else {
    //     that.data.grades[i].checked = false;
    //   }
    // }
    // that.setData({
    //   gradeValue: e.detail.value,
    //   grades: that.data.grades
    // });
    for (var i = 0; i < that.data.subjects.length; i++){
      for (var j in that.data.subjects[i].subject){
        that.data.subjects[i].subject[j].checked = false
      }
    }
    for(var i in e.detail.value){
      var item = e.detail.value[i];
      var array = item.split(",");
      that.data.subjects[array[0]].subject[array[1]].checked = true;
    }
    that.setData({
      subjects: that.data.subjects
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

  registe:function(e){
    console.log(e);
    wx.redirectTo({
      url: 'main',
    })
  },

  toAgreement:function(){
    wx.navigateTo({
      url: 'agreement',
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